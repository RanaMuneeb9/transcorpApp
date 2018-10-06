import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import Accordion from 'react-native-collapsible/Accordion';
import { Navigation } from 'react-native-navigation';
var axios = require('axios')
import { AsyncStorage } from "react-native";

export default class ProfileScreen extends Component {


  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: null,
      firstname: 'null',
      lastname: 'null',
      phone: 'null',
      username: 'null',
      email: 'null'
    }
  }

  componentWillMount() {
    this.loadData(this.props.token)
  }

  async loadData(token) {

    let url = "http://transcorp.cregital.com/api/user";

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("email", "this.state.emai");
      let response = await axios({
        method: 'GET',
        url: url,
        // data: bodyFormData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token

        }
      });

      if (response.data.success) {
        this.setState({
          data: response.data.success[0],
          username: response.data.success[0].user.username,
          email: response.data.success[0].user.email,
          firstname: response.data.success[0].first_name,
          lastname: response.data.success[0].last_name,
          phone: response.data.success[0].phone,
        })

        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 1000);
      }
    } catch (e) {
      alert(e);
      this.setState({
        loading: false,
      })
    }
  }

  render() {

    const SECTIONS = [
      {
        title: 'PERSONAL DETAILS',
        content: 'Lorem ipsum...',
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        phone: this.state.phone
      }
    ];

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column', justifyContent: 'flex-start'
      }}>
        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
              <Image source={require('../../assets/TranscorpIcon-black.png')} />
              <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>MY PROFILE</Text>
              <TouchableOpacity onPress={() => {
                this.props.navigator.push({
                  screen: 'transcorpApp.ContactUsScreen',
                  passProps: { token: this.props.token }
                });
              }}>
                <Image source={require('../../assets/phone-call-black.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: '#F0F0F0',
              borderBottomWidth: 2,
            }}
          >
          </View>

          <View style={{

            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
          }}>

            <View style={{ height: 200, width: 170, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: 140, width: 140 }} source={require('../../assets/ProfilePicture.png')} />
            </View>

            <View style={{ flexDirection: 'column', width: '50%', height: 200, justifyContent: 'center' }}>
              <Text style={{ color: '#1C1C1C', fontSize: 20, fontFamily: 'century-gothic-bold' }}>{this.state.username}</Text>
              <Text style={{ color: '#545454', fontSize: 16, fontFamily: 'century-gothic' }}>{this.state.email}</Text>
              <TouchableOpacity onPress={() => {

                this.props.navigator.push({
                  screen: 'transcorpApp.EditProfileScreen',
                  passProps: { data: this.state.data, token: this.props.token }
                });

              }} >
                <Text style={{ color: '#FF8300', fontSize: 14, fontFamily: 'century-gothic' }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>



          <View
            style={{
              borderBottomColor: '#F0F0F0',
              borderBottomWidth: 2,
            }}
          >
          </View>
          <View>
            <Accordion
              sections={SECTIONS}
              renderHeader={this._renderHeader}
              underlayColor='#d8d8d8'
              renderContent={this._renderContent}
              style={{ marginLeft: 20, paddingVertical: 10 }}
            />
          </View>


          <View
            style={{
              borderBottomColor: '#F0F0F0',
              borderBottomWidth: 2,
            }}
          >
          </View>
          <View>
            <TouchableOpacity onPress={() => {

              this.props.navigator.push({
                screen: 'transcorpApp.MyRewardsScreen',
                passProps: { points: this.state.data.user.point_balance, membership_id: this.state.data.user.membership_id, token: this.props.token }
              });

            }} >
              <Text style={{ color: '#545454', fontSize: 18, marginLeft: 20, paddingVertical: 10, fontFamily: 'century-gothic' }}>MY REWARDS</Text>
            </TouchableOpacity>

          </View>

          <View
            style={{
              borderBottomColor: '#F0F0F0',
              borderBottomWidth: 2,
            }}
          >
          </View>

          <View>
            <TouchableOpacity onPress={() => {

                AsyncStorage.clear();
                Navigation.startSingleScreenApp({
                  screen: {
                    screen: 'transcorpApp.LoginScreen',
                    passProps: { abcd: "asas" } 
                  }
                });
           
            }} >
              <Text style={{ color: '#545454', fontSize: 18, marginLeft: 20, paddingVertical: 10, fontFamily: 'century-gothic' }}>LOG OUT</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View >
    );
  }

  _renderHeader(section) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#545454', paddingVertical: 10, width: '85%', fontSize: 18, fontFamily: 'century-gothic' }}>PERSONAL DETAILS</Text>
        <Image source={require('../../assets/chevron-down.png')} />
      </View>

    );
  }

  _renderContent(section) {
    return (
      <View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ width: '30%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>FIRST NAME</Text>
          </View>

          <View style={{ width: '70%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>{section.first_name}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ width: '30%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>LAST NAME</Text>
          </View>

          <View style={{ width: '70%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>{section.last_name}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ width: '30%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>PHONE</Text>
          </View>

          <View style={{ width: '70%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>{section.phone}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ width: '30%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>PASSWORD</Text>
          </View>

          <View style={{ width: '70%', height: 30, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}>***********</Text>
          </View>
        </View>

      </View>
    );
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