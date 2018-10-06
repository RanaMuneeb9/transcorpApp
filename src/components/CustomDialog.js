import PopupDialog from 'react-native-popup-dialog';
import React, { Component } from 'react';


const CustomDialog = props => {
  const {
    dilaog,
    ...attributes
  } = props;

  return (
    <PopupDialog
          ref={(popupDialog) => { this.popupDialog1 = popupDialog; }}
          show={true}
          dismissOnTouchOutside={false}
          width={0.9}
          height={500}
        >


          <View style={{ alignSelf: 'center', alignItems: 'center' }}>

            <Text style={{ color: '#545454', fontSize: 20, marginTop: 40 }}>END USER LICENSE AGREEMENT</Text>

            <Text style={{ color: '#545454', fontSize: 15, marginTop: 40 }}>Using he Transcorp Hotels app on this device</Text>
            <Text style={{ color: '#545454', fontSize: 15 }}>requires you to accept the terms and conditions</Text>

            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
              // this.props.navigator.push({
              //   screen: 'transcorpApp.SignUpScreen',
              //   title: 'SignUp'
              // });
            }}>
              <Text style={{ color: '#FF8300', fontSize: 15, textDecorationLine: 'underline' }}>Read Terms</Text>
            </TouchableOpacity>
          </View>

          </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20
        }}>

          <TouchableOpacity onPress={() => {
            this.popupDialog.dismiss();
          }} style={{ width: '40%', backgroundColor: "#FFFFFF", height: 50, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1.2, borderColor: '#545454' }}>
            <Text style={{ textAlign: 'center', color: '#545454', fontFamily: 'Century Gothic-Bold', fontSize: 16 }}>DECLINE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this.popupDialog.dismiss();
          }} style={{ width: '40%', backgroundColor: "#FF8300", height: 50, marginTop: 10, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Century Gothic-Bold', fontSize: 16 }}>ACCEPT</Text>
          </TouchableOpacity>

        </View>
        </PopupDialog>
  );
}
export default CustomDialog;