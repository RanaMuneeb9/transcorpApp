import React, { Component } from 'react';
import { Text, View, StyleSheet,Image,TextInput,Button,TouchableOp,Icon,ImageBackground,TouchableOpacity,ActivityIndicator} from 'react-native';

import {singleScreenApplication} from '../styles/navigatorStyles';
import final_url from "../data/constants";

export default class LicenseAgreementScreen extends Component {

  static navigatorStyle=singleScreenApplication; 

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      address: ''
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/signup_background.png')} style={styles.background}>
        
      <View style={{alignSelf:'center',alignItems:'center',marginTop:50}}>
        
        <Text style={{color:'#815097',fontSize:20}}>Welcome To</Text>
        <Text style={{color:'#eeeef1',fontSize:40}}>Host Inn</Text>
      
      </View>
        <View style={styles.centerStyle}>
        <TextInput
        style={styles.textInputStyle1}
          placeholder="Email"
          placeholderTextColor='#eeeef1'
          underlineColorAndroid='#eeeef1'
        />
        <TextInput
          
          style={styles.textInputStyle}
          placeholder="Password"
          placeholderTextColor='#eeeef1'
          underlineColorAndroid='#eeeef1'
         
        />  

        <View style={{marginTop:20}}>

        <Button style={{width:'100%'}}
         onPress={() => this.attemptLogin()}
          title="Login"
          color="#841584"
        />

      
      <Loader
          loading={this.state.loading} />
   
        
        <View style={{alignSelf:'center',alignItems:'center',marginTop:20}}>
      
        <TouchableOpacity style={{padding: 20,marginTop:10}} onPress={()=> {
            this.props.navigator.push({
              screen: 'transcorpApp.SignUpScreen',
              title: 'SignUp'
            });
         }}>
             <Text style={{color:'#815097',fontSize:15}}>Don't have an account ? Sign Up !</Text>
        </TouchableOpacity>

      
        </View>

     </View> 
        
        </View>
      </ImageBackground>
    );
  }

  async attemptLogin() {
    // this.setState({
    //   loading: true
    // });

    // let result = await this.search();
    // console.log(result);

    // setTimeout(() => {
    //   this.setState({
    //     loading: false,
    //   });
    // }, 2500);

    this.props.navigator.push({
      screen: 'transcorpApp.MainScreen',
      title: 'SignUp'
    });
  }

  async search() {
    let encodedAddress = encodeURIComponent();

    let url = final_url+'userLogin';

    try{
      let response = await fetch(url);
      if(response.status > 400){
        return {};
      } else {
        return await response.json();
      }
    } catch(e) {
      return {};
    }
  }


}

const styles = StyleSheet.create({
    background: {
      backgroundColor: '#eeeef1',
      flex:1
    },
    textInputStyle:{
      color: '#eeeef1',
      marginTop: 20,
      width:'100%'
    },
    textInputStyle1:{
      color: '#eeeef1',
      width:'100%'
    },
    centerStyle: {
      flex:1,
      justifyContent:'center',
      marginLeft: 40,
      marginRight: 40,
    }
  });
  