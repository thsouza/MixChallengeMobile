import React, {Component} from 'react';
import {FlatList, StyleSheet, AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';
import {API_URL} from '../../services/api';

class Trato extends Component {
  static navigationOptions = () => ({
    title: 'Trato',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#1d4a81',
    },
  });

  state = {
    data: [],
    isLoading: false,
    isRefreshing: false,
  };

  handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.loadData();
      },
    );
  };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    this.setState({isLoading: true});

    const token = await AsyncStorage.getItem('@mix-challenge:token');
    let response = await fetch(API_URL + '/confinement', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });

    let responseJson = await response.json();

    this.setState({
      data: responseJson.data,
      isRefreshing: false,
    });
  };

  render() {
    const {data, isRefreshing} = this.state;

    return (
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ListItem
            leftAvatar={{
              source: {
                uri:
                  'https://st2.depositphotos.com/4060975/8907/v/950/depositphotos_89072312-stock-illustration-cow-face-flat-icon-illustration.jpg',
              },
            }}
            title={item.name}
            subtitle={`${item.initDate} - ${item.endDate}`}
            bottomDivider
            leftElement
            chevron
            onPress={async () => {
              await AsyncStorage.setItem('@mix-challenge:itemId', item._id);
              this.props.navigation.navigate('Details');
            }}
          />
        )}
        keyExtractor={i => i._id}
        refreshing={isRefreshing}
        onRefresh={this.handleRefresh}
        //onEndReached={this.handleLoadMore}
        onEndThreshold={0}
      />
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  scene: {
    flex: 1,
    paddingTop: 25,
  },
  user: {
    width: '100%',
    backgroundColor: '#333',
    marginBottom: 10,
    paddingLeft: 25,
  },
  userName: {
    fontSize: 17,
    paddingVertical: 20,
    color: '#fff',
  },
});

export default Trato;
