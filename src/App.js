import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'transcorpApp.SplashScreen', // unique ID registered with Navigation.registerScreen
    title: 'Welcome',
    navigationBarStyle : {navBarHidden: true }
  }
});