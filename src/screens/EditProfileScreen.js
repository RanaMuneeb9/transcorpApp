import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TextInput, Button, TouchableOp, Icon, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
var axios = require('axios');
import MyLoader from '../components/MyLoader';

export default class EditProfileScreen extends Component {


  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);


    this.state = {
      loading: false,
      first_name: this.props.data.first_name,
      last_name: this.props.data.last_name,
      phone: this.props.data.phone,
      current_pass: '',
      new_pass: '',
      confirm_pass: '',
    }
  }
  render() {

    const SECTIONS = [
      {
        title: 'PERSONAL DETAILS',
        content: 'Lorem ipsum...'
      }
    ];

    return (
      <View style={{flex: 1}}>
        <ScrollView>
        <MyLoader
          loading={this.state.loading} />
      <View style={{
        flex: 1,
        flexDirection: 'column', justifyContent: 'flex-start'
      }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
            <TouchableOpacity onPress={() => {
              this.props.navigator.pop({
                animated: true, // does the pop have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
              });
            }}>
              <Image source={require('../../assets/ArrowBack.png')} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>Edit PROFILE</Text>
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
            borderBottomWidth: 2,
          }}
        >
        </View>

        <View style={{

          flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          marginTop: 20
        }}>

          <View style={{ height: 160, width: 160, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 140, width: 140 }} source={require('../../assets/ProfilePicture.png')} />
          </View>


          <TouchableOpacity onPress={() => {

            this.props.navigator.push({
              screen: 'transcorpApp.EditProfileScreen',
              title: 'Pushed Screen'
            });

          }} >
            <Text style={{ color: '#FF8300', marginBottom: 10, fontSize: 14, fontFamily: 'century-gothic' }}>Edit Profile</Text>
          </TouchableOpacity>

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
        }}>
          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 16, fontFamily: 'century-gothic' }}>FIRST NAME</Text>
          </View>

          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <TextInput style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}
              placeholderTextColor='#545454'
              underlineColorAndroid="transparent"
              onChangeText={(value) => this.setState({ first_name: value })}>{this.state.first_name}
            </TextInput>

          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontSize: 16, fontFamily: 'century-gothic' }}>LAST NAME</Text>
          </View>

          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <TextInput style={{ textAlign: 'center', color: '#545454', fontSize: 14, fontFamily: 'century-gothic' }}
              placeholderTextColor='#545454'
              underlineColorAndroid="transparent"
              onChangeText={(value) => this.setState({ last_name: value })}>{this.state.last_name}
            </TextInput>

          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

        <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{ width: '50%',  height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454',  fontSize: 16,fontFamily: 'century-gothic' }}>PHONE</Text>
          </View>

          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TextInput style={{ textAlign: 'center', color: '#545454',  fontSize: 14,fontFamily: 'century-gothic' }} 
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ phone: value })}>{this.state.phone}
            </TextInput>
         
            </View>
      </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

         <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{ width: '50%',  height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454',  fontSize: 16,fontFamily: 'century-gothic' }}>CURRENT PASSWORD</Text>
          </View>

          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TextInput style={{ textAlign: 'center', color: '#545454',  fontSize: 14,fontFamily: 'century-gothic' }} 
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ current_pass: value })}>{this.state.current_pass}
            </TextInput>
         
            </View>
      </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

        <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{ width: '50%',  height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454',  fontSize: 16,fontFamily: 'century-gothic' }}>NEW PASSWORD</Text>
          </View>

          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TextInput style={{ textAlign: 'center', color: '#545454',  fontSize: 14,fontFamily: 'century-gothic' }} 
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ new_pass: value })}>{this.state.new_pass}
            </TextInput>
         
            </View>
      </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />
 <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{ width: '50%',  height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ textAlign: 'center', color: '#545454',  fontSize: 16,fontFamily: 'century-gothic' }}>CONFIRM PASSWORD</Text>
          </View>

          <View style={{ width: '50%', height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
          <TextInput style={{ textAlign: 'center', color: '#545454',  fontSize: 14,fontFamily: 'century-gothic' }} 
            placeholderTextColor='#545454'
            underlineColorAndroid="transparent"
            onChangeText={(value) => this.setState({ confirm_pass: value })}>{this.state.confirm_pass}
            </TextInput>
         
            </View>
      </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 2,
          }}
        />

        <TouchableOpacity onPress={() => {
           this.loadData(this.props.token)
          }
        }
          style={{ width: '90%', marginLeft: 20, marginTop: 30, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic-bold' }}>SAVE CHANGES</Text>
        </TouchableOpacity>


      </View >
      </ScrollView>
      </View>
    );
  }

  async loadData(token) {

    this.setState({
      loading: true
    })
    let url = "http://transcorp.cregital.com/api/user/edit/profile";

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("sex", "male");
      bodyFormData.append("dob", "1994-08-13");
      bodyFormData.append("first_name", this.state.first_name);
      bodyFormData.append("last_name", this.state.last_name);
      bodyFormData.append("phone", this.state.phone);
      bodyFormData.append("old_password",this.state.current_pass);
      bodyFormData.append("newpassword",this.state.new_pass);
      bodyFormData.append("confirmpass",this.state.confirm_pass);
      let response = await axios({
        method: 'POST',
        url: url,
        data: bodyFormData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.data.success) {
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 1000);

        alert("Profile Updated Successfully!");
       
        this.props.navigator.resetTo({
          screen: 'transcorpApp.ProfileScreen', // unique ID registered with Navigation.registerScreen
          passProps: {token:this.props.token}, // simple serializable object that will pass as props to the pushed screen (optional)
          animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
          animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
          });
      }
    } catch (e) {
      alert("Error. Please try again");
      this.setState({
        loading: false,
      })
    }
  }

}