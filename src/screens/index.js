import { Navigation } from 'react-native-navigation';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import WelcomeScreen from './WelcomeScreen';
import ExploreScreen from './ExploreScreen';
import CompleteBookingScreen from './CompleteBookingScreen';
import ServicesScreen from './ServicesScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import MyRewardsScreen from './MyRewardsScreen';
import StatusBenifitsScreen from './StatusBenifitsScreen';
import ContactUsScreen from './ContactUsScreen';
import RoomDetailsScreen from './RoomDetailsScreen';
import SearchResultScreen from './SearchResultScreen';
import BookingScreen from './BookingScreen';
import PaymentScreen from './PaymentScreen';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('transcorpApp.SplashScreen', () => SplashScreen);
  Navigation.registerComponent('transcorpApp.WelcomeScreen', () => WelcomeScreen);
  Navigation.registerComponent('transcorpApp.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('transcorpApp.SignUpScreen', () => SignUpScreen);

  Navigation.registerComponent('transcorpApp.ExploreScreen', () => ExploreScreen);
  Navigation.registerComponent('transcorpApp.CompleteBookingScreen', () => CompleteBookingScreen);
  Navigation.registerComponent('transcorpApp.PaymentScreen', () => PaymentScreen);
  Navigation.registerComponent('transcorpApp.BookingScreen', () => BookingScreen);
  Navigation.registerComponent('transcorpApp.SearchResultsScreen', () => SearchResultScreen);
  Navigation.registerComponent('transcorpApp.ServicesScreen', () => ServicesScreen);
  Navigation.registerComponent('transcorpApp.ProfileScreen', () => ProfileScreen);
  Navigation.registerComponent('transcorpApp.EditProfileScreen', () => EditProfileScreen);
  Navigation.registerComponent('transcorpApp.MyRewardsScreen', () => MyRewardsScreen);
  Navigation.registerComponent('transcorpApp.StatusBenifitsScreen', () => StatusBenifitsScreen);
  Navigation.registerComponent('transcorpApp.ContactUsScreen', () => ContactUsScreen);
  Navigation.registerComponent('transcorpApp.RoomDetailsScreen', () => RoomDetailsScreen);

}
