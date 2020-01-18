import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Playder',
        headerTitleAlign: 'center'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Github Profile',
        headerTitleAlign: 'center'
      }
    }, 
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#13d4c4'
      },
    }
  })
);

export default Routes;