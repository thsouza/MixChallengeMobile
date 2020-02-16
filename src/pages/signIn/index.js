import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, AsyncStorage} from 'react-native';
//import {StackActions, NavigationActions} from 'react-navigation';
import api from '../../services/api';
import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {userName: '', password: '', error: ''};

  handleEmailChange = userName => {
    this.setState({userName});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.userName.length === 0 || this.state.password.length === 0) {
      this.setState(
        {error: 'Preencha usuário e senha para continuar!'},
        () => false,
      );
    } else {
      try {
        const response = await api.post('/user/login', {
          userName: this.state.userName,
          password: this.state.password,
        });

        await AsyncStorage.setItem('@mix-challenge:token', response.data.token);

        //const resetAction = StackActions.reset({index: 0, actions: [NavigationActions.navigate({routeName: 'Trato'})]});
        this.props.navigation.navigate('Trato');
      } catch (_err) {
        this.setState({
          error: 'Houve um problema com o login, verifique suas credenciais!',
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo
          source={require('../../images/premix-logo.png')}
          resizeMode="contain"
        />
        <Input
          placeholder="Usuário"
          value={this.state.userName}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && (
          <ErrorMessage>{this.state.error}</ErrorMessage>
        )}
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Container>
    );
  }
}
