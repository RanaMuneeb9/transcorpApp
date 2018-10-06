import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOp, Icon, ImageBackground, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
var axios = require('axios');
import PopupDialog from 'react-native-popup-dialog';

export default class BookingScreen extends Component {


    static navigatorStyle = singleScreenApplication;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            starCount: 2.5,
            destination: '',
            data1: [
                {
                    check_in: '18/09/2018',
                    check_out: '18/09/2018',
                    ref: 'AV1245TR3',
                    amount: '40,0000',
                }],
            selected_item: {
                check_in: '18/09/2018',
                check_out: '18/09/2018',
                ref: 'AV1245TR3',
                amount: '40,0000',
            },
            data: null
        };
    }


    componentWillMount() {
        this.loadData(this.props.token)
    }

    async loadData(token) {

        let url = "http://transcorp.cregital.com/api/user/booking/history";

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
                    data: response.data.success
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
        return (
            <View flexDirection='column'>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                        <Image source={require('../../assets/TranscorpIcon-black.png')} />
                        <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>RECENT BOOKINGS</Text>
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
                <FlatList
                    data={this.state.data1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>

                            <Text style={{ textAlign: 'center', width: '31%', fontSize: 15, color: '#545454', fontFamily: 'century-gothic-bold' }}>BOOKING REF.</Text>
                            <Text style={{ textAlign: 'center', width: '22%', fontSize: 15, color: '#545454', fontFamily: 'century-gothic-bold' }}>CHECK-IN</Text>
                            <Text style={{ textAlign: 'center', width: '22%', fontSize: 15, color: '#545454', fontFamily: 'century-gothic-bold' }}>CHECK-OUT</Text>
                            <Text style={{ textAlign: 'center', width: '25%', fontSize: 15, color: '#545454', fontFamily: 'century-gothic-bold' }}>AMOUNT</Text>
                        </View>
                    }
                    keyExtractor={item => item.email}
                />

                <View style={{ paddingBottom: 150}}>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                   
                    renderItem={({ item, index }) =>
                        (index % 2) ?
                           
                                <View style={{ backgroundColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                                   <TouchableOpacity style={{ marginLeft:20,width: '31%' }} onPress={() => {
                                this.setState({
                                    selected_item: item
                                })
                                this.popupDialog.show();
                            }}>
                                    <Text style={{ fontSize: 14, color: '#FF8300', fontFamily: 'century-gothic' }}>{item.booking_number}</Text>
                                    </TouchableOpacity> 
                                    <Text style={{ width: '22%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>{item.start_date}</Text>
                                    <Text style={{ width: '22%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>{item.end_date}</Text>
                                    <Text style={{ width: '25%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>₦{item.total}</Text>
                                </View>:
                                <View style={{ backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                            <TouchableOpacity style={{ marginLeft:10,width: '31%' }} onPress={() => {
                                this.setState({
                                    selected_item: item
                                })
                                this.popupDialog.show();
                            }}>
                                    <Text style={{fontSize: 14, color: '#FF8300', fontFamily: 'century-gothic' }}>{item.booking_number}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ width: '22%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>{item.start_date}</Text>
                                    <Text style={{ width: '22%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>{item.end_date}</Text>
                                    <Text style={{ width: '25%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>₦{item.total}</Text>
                                </View>

                    }
                    keyExtractor={item => item.email}
                />
                </View>


                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    show={false}
                    dismissOnTouchOutside={false}
                    width={0.9}
                    height={260}
                >


                    <View style={{ backgroundColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'left', width: '50%', fontSize: 16,paddingLeft:20, color: '#545454', fontFamily: 'century-gothic-bold' }}>Completed</Text>
                        <Text style={{ textAlign: 'left', width: '50%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>{this.state.selected_item.completed == 0 ? 'No' : 'Yes'}</Text>
                    </View>
                    <View style={{ backgroundColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'left', width: '50%', fontSize: 16,paddingLeft:20, color: '#545454', fontFamily: 'century-gothic-bold' }}>DESCRIPTION</Text>
                        <Text style={{ textAlign: 'left', width: '50%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>ABC</Text>
                    </View>
                    <View style={{ backgroundColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'left', width: '50%', fontSize: 16,paddingLeft:20, color: '#545454', fontFamily: 'century-gothic-bold' }}>GUESTS</Text>
                        <Text style={{ textAlign: 'left', width: '50%', fontSize: 14, color: '#545454', fontFamily: 'century-gothic' }}>{this.state.selected_item.guest_number}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.popupDialog.dismiss();
                    }} style={{ marginHorizontal: 50, backgroundColor: "#FF8300", height: 50, marginBottom: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1.2, borderColor: '#545454' }}>
                        <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic' }}>OK</Text>
                    </TouchableOpacity>
                </PopupDialog>
            </View >
        );
    }
}