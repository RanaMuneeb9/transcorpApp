import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import Accordion from 'react-native-collapsible/Accordion';
var axios = require('axios')
import MyLoader from '../components/MyLoader';

export default class ContactUsScreen extends Component {


    static navigatorStyle = singleScreenApplication;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            address: '',
            first_name: 'abc',
            last_name: 'asd',
            message: 'adsasdasd'
        }
    }
    render() {

        const SECTIONS = [
            {
                title: 'ABUJA',
                content: 1,
                token: this.props.token, 
                phone: '+234-708-060-3000',
                email: 'hilton.abuja@hilton.com'
            }, {
                title: 'CALABAR',
                content: 2,
                token: this.props.token, 
                 phone: '+234-708-060-3000',
                email: 'hilton.abuja@hilton.com'
            }
        ];

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column', justifyContent: 'flex-start'
            }}>

                <MyLoader
                    loading={this.state.loading} />
                <ScrollView>
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
                            <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>CONTACT US</Text>
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
                            renderContent={this._renderContent}
                            style={{ marginLeft: 20, paddingVertical: 10, marginRight: 20 }}
                        />
                    </View>
                </ScrollView>

            </View >
        );
    }



    _renderHeader(section) {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#545454', paddingVertical: 10, width: '85%', fontSize: 18, fontFamily: 'century-gothic' }}>{section.title}</Text>
                    <Image source={require('../../assets/chevron-down.png')} />

                </View>
                <View
                    style={{
                        borderBottomColor: '#F0F0F0',
                        borderBottomWidth: 2,
                    }}
                >
                </View>
            </View>


        );
    }

    _renderContent = section => {
        if (section.content === 1) {
            return (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 16, fontFamily: 'century-gothic-bold' }}>{section.phone}</Text>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>{section.email}</Text>
                        </View>

                        <Image source={require('../../assets/phone-call-black.png')} />

                    </View>

                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ fontFamily: 'Century Gothic-Regula', fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="First Name"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ first_name: value })}
                            height={50}
                        />
                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ fontFamily: 'Century Gothic-Regula', fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="Last Name"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ last_name: value })}
                            height={50}
                        />
                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ textAlign: 'left', textAlignVertical: 'top', fontFamily: 'century-gothic', fontSize: 14, paddingLeft: 10 }}
                            placeholder="Additional Information"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            height={150}
                            onChangeText={(value) => this.setState({ message: value })}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>

                    <TouchableOpacity onPress={() => {
                        if (this.state.first_name == '' || this.state.last_name == '' || this.state.message == '') {
                            alert("Please enter all details!")
                        } else {
                            this.postData(section.token,"/contact_abuja")
                        }
                    }} style={{ width: '90%', marginLeft: 20, marginTop: 30, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic-bold' }}>SUBMIT</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 16, fontFamily: 'century-gothic-bold' }}>{section.phone}</Text>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>{section.email}</Text>
                        </View>

                        <Image source={require('../../assets/phone-call-black.png')} />

                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ fontFamily: 'Century Gothic-Regula', fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="First Name"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ first_name: value })}
                            height={50}
                        />
                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ fontFamily: 'Century Gothic-Regula', fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="Last Name"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ last_name: value })}
                            height={50}
                        />
                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ textAlign: 'left', textAlignVertical: 'top', fontFamily: 'century-gothic', fontSize: 14, paddingLeft: 10 }}
                            placeholder="Additional Information"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            height={150}
                            onChangeText={(value) => this.setState({ message: value })}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>

                    <TouchableOpacity onPress={() => {
                        if (this.state.first_name == '' || this.state.last_name == '' || this.state.message == '') {
                            alert("Please enter all details!")
                        } else {
                            this.postData(section.token,"/contact_calabar")
                        }
                    }} style={{ width: '90%', marginLeft: 20, marginTop: 30, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic-bold' }}>SUBMIT</Text>
                    </TouchableOpacity>

                </View>


            );
        }
    }

    async postData(token,endpoint) {

        this.setState({
            loading: true
        })
        let url = "http://transcorp.cregital.com/api"+endpoint;

        try {
            var bodyFormData = new FormData();
            bodyFormData.append("first_name", this.state.first_name);
            bodyFormData.append("last_name", this.state.last_name);
            bodyFormData.append("message", this.state.message);
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

                alert("Email Sent. We will contact you soon")
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
}
