import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import SignIn from './pages/signIn';
import Trato from './pages/trato';
import Details from './pages/details';

const RootStack = createStackNavigator({
  Sair: {
    screen: SignIn,
  },
  Trato: {
    screen: Trato,
  },
  Details: {
    screen: Details,
  },
});

const Routes = createAppContainer(RootStack);

export default Routes;
