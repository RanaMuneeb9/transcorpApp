import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import final_url from "../data/constants";
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';

export default class ExploreScreen extends Component {

  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      address: '',
      checkInText: 'CHECK-IN',
      checkInDate: null,
      destinaion: 'CHOOSE DESTINATION',
      checkOutText: 'CHECK-OUT',
      checkOutDate: null,
      imageheight: Dimensions.get('window').height / 3
    }
  }
  
  render() {
    return (
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            <Image style={{ flex: 1, height: this.state.imageheight, width: "100%" }} source={require('../../assets/Background.png')} resizeMode="stretch" />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 20 }}>
              <Image source={require('../../assets/TranscorpIcon.png')} />
              <Text style={{ textAlign: 'center', width: '80%', fontSize: 16, color: '#FFFFFF',fontFamily: 'century-gothic-bold' }}>Welcome {this.props.username}</Text>
              <TouchableOpacity onPress={() => {
                this.props.navigator.push({
                  screen: 'transcorpApp.ContactUsScreen',
                  passProps: { token:this.props.token}
                });
              }}>
                <Image source={require('../../assets/phone-call.png')} />
              </TouchableOpacity>
            </View>
            <Image source={require('../../assets/Transcorplogo.png')} style={{ position: 'absolute', bottom: 20 }} />
          </View>

          <View style={{ borderColor: '#F0F0F0', height: 60, borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>

            <ModalDropdown onSelect={(idx, value) => {
              this.setState({
                destinaion: value
              })
            }} options={['Calabar', 'Abuja']} dropdownTextStyle={{ fontSize: 14,fontFamily: 'century-gothic' }} style={{ paddingHorizontal: 10 }} dropdownStyle={{ width: '80%',height:100, flexWrap: 'wrap' }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ marginLeft: 5 }} source={require('../../assets/map-pin.png')} />
                <Text style={{ marginLeft: 10, width: '85%', fontSize: 14,fontFamily: 'century-gothic-bold' }}>{this.state.destinaion}</Text>
                <Image source={require('../../assets/chevron-down.png')} />
              </View>
            </ModalDropdown>

          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
          }}>

            <View style={{ width: '40%', backgroundColor: "#FFFFFF", height: 60, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#F0F0F0', borderWidth: 3 }} >
              <TouchableOpacity onPress={() => {
                this.refs.checkInDialog.open({
                  date: new Date(),
                  minDate: new Date()
                });
              }}>
                <View style={{ paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../../assets/Bookings-Check-in-out.png')} />
                  <Text style={{ marginLeft: 10, width: '90%', color: '#545454', fontSize: 14,fontFamily: 'century-gothic-bold' }}>{this.state.checkInText}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ width: '40%', backgroundColor: "#FFFFFF", height: 60, marginTop: 10, marginRight: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#F0F0F0', borderWidth: 3 }} >
              <TouchableOpacity onPress={() => {
                this.refs.checkOutDialog.open({
                  date: new Date(),
                  minDate: this.state.checkInDate
                });
              }}>
                <View style={{ paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../../assets/Bookings-Check-in-out.png')} />
                  <Text style={{ marginLeft: 10, width: '90%', color: '#545454', fontSize: 14,fontFamily: 'century-gothic-bold'}}>{this.state.checkOutText}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,

          }}>
            <TouchableOpacity onPress={() => {
              if(this.state.destinaion=='CHOOSE DESTINATION' || this.state.checkInDate==null || this.state.checkOutDate==null)
              {
                alert('Please enter all the details !');
              }else{
              this.props.navigator.push({
                screen: 'transcorpApp.SearchResultsScreen',
                passProps: { destination: this.state.destinaion , checkIn:this.state.checkInText ,checkOut: this.state.checkOutText,token:this.props.token}
              });
            }
            }} style={{ width: '90%', marginLeft: 20, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16,fontFamily: 'century-gothic-bold' }}>MAKE A RESERVATION</Text>
            </TouchableOpacity>
          </View>

          <DatePickerDialog ref="checkInDialog" onDatePicked={this.onCheckInDatePicked.bind(this)} />
          <DatePickerDialog ref="checkOutDialog" onDatePicked={this.onCheckOutDatePicked.bind(this)} />
        </ScrollView>
      </View >
    );
  }

  onCheckInDatePicked = (date) => {
    //Here you will get the selected date
    this.setState({
      checkInDate: date,
      checkInText: moment(date).format('DD/MM/YYYY')
    });
  }

  onCheckOutDatePicked = (date) => {
    //Here you will get the selected date
    this.setState({
      checkOutDate: date,
      checkOutText: moment(date).format('DD/MM/YYYY')
    });
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
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#eeeef1',
    flex: 1
  },
  textInputStyle: {
    color: '#eeeef1',
    marginTop: 20,
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
