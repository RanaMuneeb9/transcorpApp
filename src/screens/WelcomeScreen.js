import React from 'react';
import { StyleSheet, View, Text, ImageBackground,Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {singleScreenApplication} from '../styles/navigatorStyles';


const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'century-gothic',
    paddingHorizontal: 22,
    fontSize: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontFamily: 'century-gothic',
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'USE THIS APP TO',
    image: require('../../assets/Onboarding1.png'),
    text: 'Book a room, order in room dinning\nand make resturant reservations'
  },
  {
    key: 'somethun1',
    title: 'USE THIS APP TO',
    image: require('../../assets/Onboarding2.png'),
    text: 'Earn reward on every\nstay with us'
  },
  {
    key: 'somethun2',
    title: 'USE THIS APP TO',
    image: require('../../assets/Onboarding3.png'),
    text: 'Enhance your stay with\ncustomized services'
  },
  {
    key: 'somethun3',
    title: 'USE THIS APP TO',
    image: require('../../assets/Onboarding4.png'),
    text: 'Explore like a local\nwith insider tips'
  },
];

export default class WelcomeScreen extends React.Component {
  
  static navigatorStyle=singleScreenApplication;
  _renderItem = props => (
    <ImageBackground
      style={[{
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height
      }]}
      source={props.image}
    >
      <View>
        <View style={{height:'50%',alignItems:'flex-end',justifyContent:'flex-end'}}>
        <Image style={styles.icon} source={require('../../assets/Transcorplogo.png')}/>
        </View>
        <View style={{height:'50%',alignItems:'center',justifyContent:'flex-end'}}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
    </ImageBackground>
  );

 

  _onDone = () => {
    this.storeItem("first_installation",'1');

    this.props.navigator.resetTo({
      screen: 'transcorpApp.LoginScreen',
      passProps: { logout: 0 }
    });
  }
  async storeItem(key, item) {
    
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, item);
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        activeDotStyle= {{backgroundColor: 'rgba(155, 55, 45, .9)'}}
        dotStyle ={{backgroundColor:'rgba(255, 255, 255, 0.8)'}}
        onDone={this._onDone}
      />
    );
  }
}