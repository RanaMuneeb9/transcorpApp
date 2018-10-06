import React, { Component } from 'react';
import { Alert,Text, View, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';
var axios = require('axios')
import MyLoader from '../components/MyLoader';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);


    this.state = {
      loading: false,
      first_name: '',
      last_name:'',
      email: '',
      password: '',
      c_password: ''
    }
  }

  render() {
    return (
      <View style={{backgroundColor:'#FFFFFF',flex:1}}>
      <ScrollView>
        <MyLoader
          loading={this.state.loading} />
        <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 30 }}>

          <TextInput
            style={{ fontFamily: 'century-gothic', fontSize: 14 }}
            placeholder="First Name"
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ first_name: value })}
            height={50}
          />
        </View>
        <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

          <TextInput
            style={{ fontFamily: 'century-gothic', fontSize: 14 }}
            placeholder="Last Name"
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ last_name: value })}
            height={50}
          />
        </View>

        <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

          <TextInput
            style={{ fontFamily: 'century-gothic', fontSize: 14 }}
            placeholder="E-mail address"
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ email: value })}
            height={50}
          />
        </View>

        <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

          <TextInput
            style={{ fontFamily: 'century-gothic', fontSize: 14 }}
            placeholder="Phone Number"
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            height={50}
          />
        </View>

        <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

          <TextInput
            style={{ fontFamily: 'century-gothic', fontSize: 14 }}
            placeholder="Password"
            placeholderTextColor='#545454'
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ password: value})}
            height={50}
          />
        </View>
        <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

          <TextInput
            style={{ fontFamily: 'century-gothic', fontSize: 14 }}
            placeholder="Confirm Password"
            placeholderTextColor='#545454'
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ c_password: value})}
            height={50}
          />
        </View>


        <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            // this.props.navigator.push({
            //   screen: 'transcorpApp.SignUpScreen',
            //   title: 'SignUp'
            // });
          }}>
            <Text style={{ color: '#FF8300', fontSize: 15, textDecorationLine: 'underline',fontFamily: 'century-gothic' }}>Agree to Terms &amp; Conditions.</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,

        }}>
          <TouchableOpacity onPress={() => this.attemptLogin()}
            style={{ width: '90%', marginLeft: 20, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginTop: 10,marginBottom:10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16,fontFamily: 'century-gothic' }}>Register</Text>
          </TouchableOpacity>


        </View>
        </ScrollView>
      </View>
    );
  }

  async attemptLogin() {

    this.setState({
      loading: true
    });

    let url = "http://transcorp.cregital.com/api/register";

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("first_name", this.state.first_name);
      bodyFormData.append("last_name", this.state.last_name);
      bodyFormData.append("email", this.state.email);
      bodyFormData.append("password", this.state.password);
      bodyFormData.append("c_password", this.state.c_password);
      let response = await axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        config: {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      });
      if (response.data.success) {
        this.storeItem("token", response.data.success.token);
        this.storeItem("username", response.data.success.username);
        this.storeItem("email", this.state.email);


        alert("Registered Successfully!");

        this.setState({
          loading: false
        })
        this.props.navigator.resetTo({
          screen: 'transcorpApp.LoginScreen',
          title: 'Pushed Screen'
        });


      }
    } catch (e) {
      Alert.alert("Error","Unable to create account, please try again");
      this.setState({
        loading: false,
      })
    }


  }


  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      // const item = JSON.parse(retrievedItem);
      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  async storeItem(key, item) {
    this.popupDialog.dismiss();
    console.log(key + " " + item);
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, item);
      console.log(jsonOfItem);
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

}


const styles = StyleSheet.create({
  background: {
    backgroundColor: '#eeeef1',
    flex: 1
  },
  textInputStyle: {
    color: '#eeeef1',
    marginTop: 10,
    width: '100%'
  },
  textInputStyle1: {
    color: '#eeeef1',
    width: '100%'
  },
  centerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 40,
  }
});
