import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import Accordion from 'react-native-collapsible/Accordion';

export default class StatusBenifitsScreen extends Component {


    static navigatorStyle = singleScreenApplication;

    constructor(props) {
        super(props);
    }
    render() {

        const SECTIONS = [
            {
                title: 'BRONZE MEMBER',
                content: 'Lorem ipsum...'
            }, {
                title: 'SILVER MEMBER',
                content: 'Lorem ipsum...'
            }, {
                title: 'GOLD MEMBER',
                content: 'Lorem ipsum...'
            },
            {
                title: 'PLATINUM MEMBER',
                content: 'Lorem ipsum...'
            }
        ];

        return (
            <View style={{
                flex: 1,
                backgroundColor:'#FFFFFF',
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
                        <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>STATUS BENIFITS</Text>
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

                <View
                    style={{
                        borderBottomColor: '#F0F0F0',
                        borderBottomWidth: 2,
                    }}
                >
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{
                            marginVertical: 20
                        }}>
                            <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'century-gothic' }}>The number of points you earn is based on the   amount you spend on your room</Text>
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
                                underlayColor='#d8d8d8'
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                style={{ marginLeft: 20, paddingVertical: 10 }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View >
        );
    }

    _renderHeader(section) {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#545454', paddingVertical: 10, width: '85%', fontSize: 18 }}>{section.title}</Text>
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

    _renderContent(section) {
        if (section.title == 'BRONZE MEMBER') {
            return (
                <View>
                    <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', marginRight: 20, borderRadius: 40, borderWidth: 1, borderColor: '#fff' }}>
                        <ImageBackground source={require('../../assets/RectangularBar.png')} style={{ height: 84, width: '100%' }} >
                            <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'center', width: '50%' }}>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>First N25,000</Text>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>spent</Text>
                                    </View>
                                    <Image source={require('../../assets/Badge.png')} style={{ height: 60, width: 40, justifyContent: 'flex-end' }} />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: 'century-gothic' }}>1. Free Wifi</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>2. Simple fruit platter                                             </Text>
                          </View>
                    </View>


                </View>
            );
        } else if (section.title == 'SILVER MEMBER') {
            return (
                <View>
                    <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', marginRight: 20, borderRadius: 40, borderWidth: 1, borderColor: '#fff' }}>
                        <ImageBackground source={require('../../assets/RectangularBar.png')} style={{ height: 84, width: '100%' }} >
                            <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'center', width: '50%' }}>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>20 Nigths</Text>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>required</Text>
                                    </View>
                                    <Image source={require('../../assets/Badge.png')} style={{ height: 60, width: 40, justifyContent: 'flex-end' }} />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: 'century-gothic' }}>1. Free Wifi</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>2. Simple fruit platter</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>3. Transcorp Hotels Special Fruit Platter</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>4. Late Checkout till 2PM</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>5. Complimentary breakfast for One (1) and 10% discount for the Second Guest</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>6. Two (2) complimentary bottle water per stay</Text>
                        </View>
                    </View>


                </View>
            );
        } else if (section.title == 'GOLD MEMBER') {
            return (
                <View>
                    <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', marginRight: 20, borderRadius: 40, borderWidth: 1, borderColor: '#fff' }}>
                        <ImageBackground source={require('../../assets/RectangularBar.png')} style={{ height: 84, width: '100%' }} >
                            <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'center', width: '50%' }}>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>45 Nights</Text>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>required</Text>
                                    </View>
                                    <Image source={require('../../assets/Badge.png')} style={{ height: 60, width: 40, justifyContent: 'flex-end' }} />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: 'century-gothic' }}>1. Free Wifi</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>2. Simple fruit platter</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>3. Transcorp Hotels Special Fruit Platter</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>4. Late Checkout till 2PM</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>5. Complimentary breakfast for One (1) and 10% discount for the Second Guest</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>6. Two (2) complimentary bottle water per stay</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>7. Stay 5 nights or more and get one night free</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>8. Exclusive priority check-in/reservation line</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>9. Enjoy room upgrade</Text>
                        </View>
                    </View>


                </View>
            );
        } else if (section.title == 'PLATINUM MEMBER') {
            return (
                <View>
                    <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', marginRight: 20, borderRadius: 40, borderWidth: 1, borderColor: '#fff' }}>
                        <ImageBackground source={require('../../assets/RectangularBar.png')} style={{ height: 84, width: '100%' }} >
                            <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'center', width: '50%' }}>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>70 Nights</Text>
                                        <Text style={{ justifyContent: 'flex-start', fontSize: 18, color: '#F0F0F0', fontFamily: 'century-gothic-bold' }}>required</Text>
                                    </View>
                                    <Image source={require('../../assets/Badge.png')} style={{ height: 60, width: 40, justifyContent: 'flex-end' }} />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: 'century-gothic' }}>1. Free Wifi</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>2. Simple fruit platter</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>3. Transcorp Hotels Special Fruit Platter</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>4. Late Checkout till 2PM</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>5. Complimentary breakfast for One (1) and 10% discount for the Second Guest</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>6. Two (2) complimentary bottle water per stay</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>7. Stay 5 nights or more and get one night free</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>8. Exclusive priority check-in/reservation line</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>9. Enjoy room upgrade</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>10. Bamboo lounge VIP access with a complimentary drink</Text>
                            <Text style={{ fontFamily: 'century-gothic' }}>11. 24 - Hour Room Guarantee, subject to availabtility</Text>
                        </View>
                    </View>


                </View>
            );
        }
    }

}