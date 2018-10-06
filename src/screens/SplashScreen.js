import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import { AsyncStorage } from "react-native";

export default class SplashScreen extends Component {

  static navigatorStyle = singleScreenApplication;

  componentWillMount() {
    setTimeout(() => {
      this.retrieveItem("first_installation").then((goals) => {
             this.props.navigator.resetTo({
                screen: 'transcorpApp.LoginScreen',
                title: 'Pushed Screen'
              });
      }).catch((error) => {
        
               this.props.navigator.resetTo({
                screen: 'transcorpApp.WelcomeScreen',
                title: 'Pushed Screen'
              });

        }); 
       
    }, 3000);
  }
  render() {
    return (
      <View style={styles.background} >

        <View style={styles.center}>
          <Image source={require('../../assets/transcorpHotels.png')} style={{ marginLeft: 50, marginRight: 50 }} />
        </View>
      </View>
    );
  }

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      // const item = JSON.parse(retrievedItem);
      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return
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

}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#eeeeee',
    flex: 1
  },
  center: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
  ,
  textStyle: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold'
  }
});
