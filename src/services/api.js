import {AsyncStorage} from 'react-native';
import axios from 'axios';

const getToken = async () => {
  await AsyncStorage.getItem('@mix-challenge:token');
};

/* Mudar endereço para cada simulador (Exemplo abaixo):
 ** Genymotion:              http://10.0.3.2:3333/api
 ** Emulador Android Studio: http://10.0.2.2:3333/api
 ** Simulador IOS:           http://localhost:3333/api
 */
export const API_URL = 'http://localhost:3333/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {'x-access-token': getToken()},
});

export default api;
