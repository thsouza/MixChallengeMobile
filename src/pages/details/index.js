import React, {Component} from 'react';
import {View, ScrollView, AsyncStorage, FlatList} from 'react-native';
import {Input} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {API_URL} from '../../services/api';

class Details extends Component {
  static navigationOptions = () => ({
    title: 'Detalhes',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#1d4a81',
    },
  });

  state = {isVisible: true, data: {}};

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    const itemId = await AsyncStorage.getItem('@mix-challenge:itemId');
    const token = await AsyncStorage.getItem('@mix-challenge:token');

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };

    let response = await fetch(API_URL + '/confinement/treatment/' + itemId, {
      method: 'GET',
      headers: headers,
    });

    let responseJson = await response.json();
    this.setState({data: responseJson.data});
  };

  render() {
    const {data} = this.state;

    return (
      <ScrollView>
        {/* <Text>
          Sabe-se que um Boi começa o confinamento com 400kg e um Cavalo começa
          o 200kg, o ganho de peso diário é em torno de 800gr para o cavalo e
          1.1kg para o Boi, e o trato diário de cada animal é em torno de 0.005%
          do seu peso.
        </Text> */}

        {data && data.confinement && (
          <View>
            <Input value={data.confinement.name || ''} label="Nome" />

            <Input
              value={data.confinement.qtyBovine.toString() || ''}
              label="Qtd Bovinos"
            />

            <Input
              value={data.confinement.qtyEquine.toString() || ''}
              label="Qtd Equinos"
            />

            <Input value={data.initDate || ''} label="Início" />

            <Input value={data.endDate || ''} label="Fim" />

            <Input value={data.qtyDays.toString() || ''} label="Qtd Dias" />

            <Input
              value={data.bovine.weightBovine.toFixed(2)}
              label="Bovinos - Ganho de peso por animal (Kg)"
            />

            <Input
              value={data.bovine.totalFeed.toFixed(2)}
              label="Bovinos - Total de ração no período (Kg)"
            />

            {/* <Text>Qtd de ração utilizada por dia (Kg)</Text>
            <FlatList
              data={data.bovine.arrDayFeedBovine}
              renderItem={({item, index}) => (
                <ListItem
                  title={`Dia ${index + 1}: ${item.toFixed(3)}`}
                  bottomDivider
                  leftElement
                />
              )}
            /> */}

            <Input
              value={data.equine.weightEquine.toFixed(2)}
              label="Equinos - Ganho de peso por animal (Kg)"
            />

            <Input
              value={data.equine.totalFeed.toFixed(2)}
              label="Equinos - Total de ração no período (Kg)"
            />

            {/* <Text>Equinos</Text>
            <Text>Qtd de ração utilizada por dia (Kg)</Text>
            <FlatList
              data={data.equine.arrDayFeedEquine}
              renderItem={({item, index}) => (
                <ListItem
                  title={`Dia ${index + 1}: ${item.toFixed(3)}`}
                  bottomDivider
                  leftElement
                />
              )}
            /> */}
          </View>
        )}
      </ScrollView>
    );
  }
}

export default Details;
