import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './store';

import { registerScreens } from './screens';

registerScreens(store, Provider); // this is where you register all of your app's screens

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'screen.Schedule',
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  drawer: {
    left: {
      screen: 'comp.Drawer',
    },
  },
});
