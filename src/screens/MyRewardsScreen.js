import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import { singleScreenApplication } from '../styles/navigatorStyles';
import * as Progress from 'react-native-progress';
var axios = require('axios')
import MyLoader from '../components/MyLoader';


export default class MyRewardsScreen extends Component {


    static navigatorStyle = singleScreenApplication;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            address: '',
            progress1: 0,
            milestone1:20,
            milestone2:45,
            milestoneDifference:20,
            indeterminate: false,
            imageheight: Dimensions.get('window').height / 3,
            nights: 0,
            progress: 0
        }
    }

    componentWillMount() {
        this.loadData(this.props.token)
    }

    async loadData(token) {

        let url = "http://transcorp.cregital.com/api/user/reward";

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
                    nights: response.data.success[0].nights
                })

                if(this.state.nights<20)
                {
                    this.setState({
                        progress: response.data.success[0].nights/20,
                        progress1:0,
                        milestoneDifference:20-response.data.success[0].nights
                    })
                }else if(this.state.nights<45)
                {
                    this.setState({
                        progress:1,
                        progress1: (response.data.success[0].nights-20)/25,
                        milestone1:20,
                        milestone2:45,
                        milestoneDifference:45-response.data.success[0].nights
                    })     
                }else if(this.state.nights<70)
                {
                    this.setState({
                        progress:1,
                        progress1: (response.data.success[0].nights-20)/25,
                        milestone1:70,
                        milestone2:"70+",
                        milestoneDifference:70-response.data.success[0].nights
                    })     
                }else{
                    this.setState({
                        progress:1,
                        progress1: 0.3,
                        milestone1:70,
                        milestone2:"70+",
                        milestoneDifference:100
                    })         
                }

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

    getMembershipStatus()
    {
        if(this.state.nights<0)
        {
            return 'BRONZE';
        }else if(this.state.nights<45)
        {
            return 'SILVER';
        }else if(this.state.nights<70)
        {
            return 'GOLD';
        }else{
            return "PLATINUM";
        }
    }
    nextMileStoneRequirements()
    {
        if(this.state.nights<70)
        return "You need "+this.state.milestoneDifference +" Nights to achieve Next Milestone"
        else{
            return "You are already a PLATINUM Member"
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyLoader
                    loading={this.state.loading} />
                <View style={{ flex: 1 }}>
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
                            <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>MY REWARDS</Text>
                            <TouchableOpacity onPress={() => {
                                this.props.navigator.push({
                                    screen: 'transcorpApp.ContactUsScreen',
                                    title: 'SignUp'
                                });
                            }}>
                                <Image source={require('../../assets/phone-call-black.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View
                                style={{
                                    borderBottomColor: '#F0F0F0',
                                    borderBottomWidth: 2,
                                }}
                            />

                            <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, borderRadius: 40, borderWidth: 1, borderColor: '#fff' }}>
                                <ImageBackground style={{ flex: 1, height: 200, width: "100%", justifyContent: 'center' }} source={require('../../assets/Card.png')} resizeMode="stretch" >
                                    <View style={{ paddingHorizontal: 40, justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ justifyContent: 'flex-start', textAlignVertical: 'center', width: '50%', fontSize: 24, color: '#F0F0F0' }}>{this.getMembershipStatus()}</Text>
                                            <Image source={require('../../assets/Badge.png')} style={{ height: 100, width: 70, justifyContent: 'flex-end' }} />
                                        </View>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 20, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>{this.props.points}</Text>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 16, color: '#F0F0F0', fontFamily: 'century-gothic' }}>Total Points</Text>
                                    </View>
                                </ImageBackground>

                            </View>

                            <View
                                style={{
                                    borderBottomColor: '#F0F0F0',
                                    borderBottomWidth: 2,
                                }}
                            >
                            </View>

                            <View style={{ marginLeft: 20, marginRight: 20, marginVertical: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#545454', width: '49%', textAlign: 'center', fontFamily: 'century-gothic' }}>Total Bookings</Text>
                                    <View style={{ height: '100%', backgroundColor: '#F0F0F0', width: 2, alignItems: 'center' }} />
                                    <Text style={{ fontSize: 16, color: '#545454', textAlign: 'center', width: '49%', fontFamily: 'century-gothic-bold' }}>{this.state.nights + ' Nights'}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#F0F0F0',
                                    borderBottomWidth: 2,
                                }}
                            />


                            <View style={{ marginVertical: 20, marginLeft: 20, marginRight: 20 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ marginBottom: 30, fontSize: 16, color: '#545454', textAlign: 'center', fontFamily: 'century-gothic-bold' }}>NEXT MILESTONE REQUIREMENT</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Progress.Bar
                                            style={styles.progress}
                                            progress={this.state.progress}
                                            indeterminate={this.state.indeterminate}
                                            unfilledColor='#F0F0F0'
                                            color='#FF8300'
                                            borderColor='#F0F0F0'
                                        />

                                        <Progress.Bar
                                            style={styles.progress}
                                            progress={this.state.progress1}
                                            unfilledColor='#F0F0F0'
                                            color='#FF8300'
                                            borderColor='#F0F0F0'
                                            indeterminate={this.state.indeterminate}
                                        />

                                        <TouchableOpacity
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'rgba(0,0,0,0.2)',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 30,
                                                height: 30,
                                                backgroundColor: '#FF8300',
                                                position: 'absolute',
                                                left: '48%',
                                                borderRadius: 20,
                                            }}
                                        >
                                            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>{this.state.milestone1}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'rgba(0,0,0,0.2)',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 30,
                                                height: 30,
                                                position: 'absolute',
                                                left: '94%',
                                                backgroundColor: '#1C1C1C',
                                                borderRadius: 20,
                                            }}
                                        >
                                            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>{this.state.milestone2}</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <Text style={{ marginTop: 30, fontSize: 14, color: '#545454', textAlign: 'center', fontFamily: 'century-gothic' }}>{this.nextMileStoneRequirements()}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,

                }}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigator.push({
                            screen: 'transcorpApp.StatusBenifitsScreen',
                            title: 'SignUp'
                        });
                    }} style={{ width: '90%', marginLeft: 20, marginRight: 20, backgroundColor: "#FF8300", height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic-bold' }}>MEMBERSHIP BENIFITS</Text>
                    </TouchableOpacity>


                </View>

            </View >
        );
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
    },
    progress: {
        width: '48%',
        alignSelf: 'center',
    },
});
