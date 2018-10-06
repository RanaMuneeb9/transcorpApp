import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOp, Icon, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import GridView from 'react-native-super-grid';

export default class ServicesScreen extends Component {


  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);
  }
  render() {
    const items = [
      { name: 'HOTEL INFORMATION', pic: require('../../assets/HotelInformation.png') }, { name: 'DINNING', pic: require('../../assets/Dining.png') },
      { name: 'ROOM SERVICE', pic: require('../../assets/RoomService.png') }, { name: 'CONCIERGE', pic: require('../../assets/Concierge.png') },
      { name: 'HOUSE KEEPING', pic: require('../../assets/HouseKeeping.png') }, { name: 'LAUNDRY SERVICE', pic: require('../../assets/LaundryServices.png') },
      { name: 'DO NOT DISTURB', pic: require('../../assets/DoNotDisturb.png') }, { name: 'MAINTENANCE', pic: require('../../assets/Maintenance.png') },
       { name: 'TRANSPORTATION', pic: require('../../assets/Transportation.png') }, { name: 'VALET PARKING', pic: require('../../assets/ValetParking.png') },
      { name: 'MAPS DIRECTION', pic: require('../../assets/Maps-Directions.png') }, { name: 'WAKE UP CALL', pic: require('../../assets/WakeUpCall.png') },
      { name: 'LOCAL ATTRACTION', pic: require('../../assets/LocalAttractions.png') }, { name: 'RECREATION', pic: require('../../assets/Recreation.png') }
    ];

    return (
      <View flexDirection='column'>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
          <Image source={require('../../assets/TranscorpIcon-black.png')} />
            <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454',fontFamily: 'century-gothic-bold' }}>OUR SERVICES</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigator.push({
                screen: 'transcorpApp.ContactUsScreen',
                passProps: { token:this.props.token}
              });
            }}>
              <Image source={require('../../assets/phone-call-black.png')} />
            </TouchableOpacity>
          </View>

        </View>

        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
          }}
        />

        <GridView
          itemDimension={130}
          items={items}
          style={styles.gridView}
          renderItem={item => (
            <ImageBackground style={styles.itemContainer} source={item.pic}>
              <Text style={styles.itemName}>{item.name}</Text>
            </ImageBackground>
          )}
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    marginBottom: 80
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'century-gothic'
  },
  itempic: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
