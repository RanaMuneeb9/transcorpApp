import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import Accordion from 'react-native-collapsible/Accordion';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-check-box'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';




export default class CompleteBookingScreen extends Component {


    static navigatorStyle = singleScreenApplication;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            first_name: this.props.data.user_info[0].user.first_name,
            last_name: this.props.data.user_info[0].user.last_name,
            email: this.props.data.user_info[0].email,
            phone: this.props.data.user_info[0].user.phone,
            notes: '',
            current_points: null,
            grand_total: null,
            payment_model_visibility: false,
            radioValue: null,
            isChecked: false,
            isChecked1: false,
            selectedButton: "1",
            data: [
                { label: 'Apply ₦' + this.props.data.user_info[0].point_balance + ' from my rewards wallet to this reservation', value: "0" },
                { label: 'Do not apply my reward on this reservation. I will pay in full using my credit/debit card', value: "1", checked: true }

            ],
        }

        if (this.props.data.user_info[0].point_balance > this.props.data.price.grand_total) {
            this.setState({
                current_points: 2,
                grand_total: this.props.data.price.grand_total
            })

        } else {
            this.setState({
                current_points: 1,
                grand_total: this.props.data.price.grand_total
            })
        }

    }

    onSuccess(data) {
        alert("success")

    }

    onFailure(data) {
        alert("error")
    }
    render() {


        const SECTIONS = [
            {
                title: 'BOOKING SUMMARY',
                content: 1,
                this:this,
                phone: '+234-708-060-3000',
                email: 'hilton.abuja@hilton.com',
                data: this.props.data,
                check_in: this.props.check_in,
                check_out: this.props.check_out
            }, {
                title: 'SEE PRICE BREAKDOWN',
                content: 2,
                this:this,
                data: this.props.data,
                check_in: this.props.check_in,
                check_out: this.props.check_out
            }
        ];

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: '#FFFFFF'
            }}>
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
                            <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>GUEST INFORMATION</Text>
                            <Image source={require('../../assets/phone-call-black.png')} />
                        </View>
                    </View>

                    <View
                        style={{
                            borderBottomColor: '#F0F0F0',
                            borderBottomWidth: 2,
                        }}
                    />

                    <View style={{ flexDirection: 'row', borderColor: '#F0F0F0', height: 60, borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>

                        <ModalDropdown options={['Mr.', 'Mrs.']} style={{ paddingHorizontal: 10, width: '20%' }} dropdownStyle={{ width: '20%', flexWrap: 'wrap', fontFamily: 'century-gothic' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14, fontFamily: 'century-gothic' }}>Mr.</Text>
                                <Image source={require('../../assets/chevron-down.png')} />
                            </View>
                        </ModalDropdown>

                        <TextInput
                            style={{ width: '80%', fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="First Name"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            value={this.props.data.user_info[0].user.first_name}
                            onChangeText={(value) => this.setState({ first_name: value })}
                            height={50}
                        />

                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        <TextInput
                            style={{ fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="Last Name"
                            placeholderTextColor='#545454'
                            value={this.props.data.user_info[0].user.last_name}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ last_name: value })}
                            height={50}

                        />

                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        <TextInput
                            style={{ fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="E-mail address"
                            placeholderTextColor='#545454'
                            value={this.props.data.user_info[0].email}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ email: value })}
                            height={50}

                        />

                    </View>
                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        <TextInput
                            style={{ fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
                            placeholder="Phone Number"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            value={this.props.data.user_info[0].user.phone}
                            onChangeText={(value) => this.setState({ phone: value })}
                            height={50}

                        />

                    </View>

                    <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

                        <TextInput
                            style={{ textAlign: 'left', textAlignVertical: 'top', fontFamily: 'century-gothic', fontSize: 14, paddingLeft: 10 }}
                            placeholder="Additional Notes"
                            placeholderTextColor='#545454'
                            underlineColorAndroid="transparent"
                            height={100}
                            onChangeText={(value) => this.setState({ notes: value })}
                            multiline={true}
                            numberOfLines={5}
                        />
                    </View>
                    <View style={{ marginLeft: 20, marginVertical: 20 }}>
                        <Text style={{ fontFamily: 'century-gothic' }}>** All fields are required except Additional Notes</Text>
                    </View>

                    <View
                        style={{
                            borderBottomColor: '#F0F0F0',
                            borderBottomWidth: 2,
                            marginHorizontal: 20
                        }}
                    />

                    <View style={{ marginLeft: 20, marginVertical: 10 }}>
                        <Text style={{ color: '#545454', paddingVertical: 10, fontSize: 16, fontFamily: 'century-gothic-bold' }}>PAYMENT INSTRUCTIONS</Text>
                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>Your Transcorp Rewards balance is {this.props.data.user_info[0].point_balance} points</Text>
                        <RadioForm
                            radio_props={this.state.data}
                            initial={1}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#2196f3'}
                            animation={true}
                            onPress={(value) => { this.setState({ selectedButton: value }) }}
                            labelStyle={{ fontFamily: 'century-gothic' }}
                            style={{ marginVertical: 10 }}
                            buttonSize={15}
                            buttonColor='#545454'
                            selectedButtonColor='#FF8300'

                        />

                    </View>

                    <View
                        style={{
                            borderBottomColor: '#F0F0F0',
                            borderBottomWidth: 2,
                            marginHorizontal: 20
                        }}
                    />

                    <View style={{ marginLeft: 20, marginVertical: 10 }}>

                        <Text style={{ color: '#545454', paddingVertical: 10, fontSize: 16, fontFamily: 'century-gothic-bold' }}>TERMS &amp; CONDITIONS</Text>
                        <CheckBox
                            style={{ flex: 1, paddingVertical: 10 }}
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked
                                })
                            }}
                            isChecked={this.state.isChecked}
                            checkedCheckBoxColor={'#FF8300'}
                            rightTextStyle={{ color: '#545454', fontFamily: 'century-gothic' }}
                            rightText={"I have read and agreed to the above Terms & Conditions"}
                        />

                        <CheckBox
                            style={{ flex: 1, paddingVertical: 10 }}
                            onClick={() => {
                                this.setState({
                                    isChecked1: !this.state.isChecked1
                                })
                            }}
                            isChecked={this.state.isChecked1}
                            rightTextStyle={{ color: '#545454', fontFamily: 'century-gothic' }}
                            checkedCheckBoxColor={'#FF8300'}
                            rightText={"I would like to receive email communications from Transcorp Hotels"}
                        />
                    </View>

                    <View
                        style={{
                            borderBottomColor: '#F0F0F0',
                            borderBottomWidth: 2,
                            marginHorizontal: 20
                        }}
                    />


                    <View>
                        <Accordion
                            sections={SECTIONS}
                            underlayColor='#d8d8d8'
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            style={{ marginLeft: 20, paddingVertical: 10, marginRight: 20 }}
                        />
                    </View>

                    <View style={{ marginHorizontal: 30, marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 16, fontFamily: 'century-gothic-bold' }}>GRAND TOTAL</Text>
                        </View>

                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 16, fontFamily: 'century-gothic-bold' }}>₦{this.props.data.price.grand_total}</Text>
                    </View>



                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,

                    }}>
                        <TouchableOpacity onPress={() => {
                            this.attemptPayment(this.props.token, this.state.selectedButton)
                        }} style={{ width: '90%', marginLeft: 20, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic-bold' }}>COMPLETE RESERVATION</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        );
    }

    async attemptPayment(token, selectedButton) {

        if (this.state.first_name === '' || this.state.last_name === '' || this.state.email === '' || this.state.phone === '' || this.state.email === '') {
            alert("Please complete all required fields !")
        } else if (this.state.isChecked) {
            if (selectedButton == "0") {

                if (this.props.data.user_info[0].point_balance > this.props.data.price.grand_total) {
                    this.setState({
                        current_points: 2,
                        grand_total: this.props.data.price.grand_total
                    })

                } else {
                    this.setState({
                        current_points: 1,
                        grand_total: this.props.data.price.grand_total
                    })

                }
            } else {
                this.setState({
                    current_points: 0,
                    grand_total: this.props.data.price.grand_total
                })
            }

            setTimeout(() => {
                this.props.navigator.push({
                    screen: 'transcorpApp.PaymentScreen',
                    passProps: {
                        data: this.props.data,
                        grand_total: this.state.grand_total,
                        email: this.state.email,
                        phone: this.state.phone,
                        notes: this.state.notes,
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        check_in: this.props.check_in,
                        check_out: this.props.check_out,
                        token: this.props.token,
                        apply_points: this.state.current_points,
                        title: 'Mr.',
                        bookingGetemails: this.state.isChecked1

                    }
                });
            }, 2000);


        } else {
            alert("Please agree to Terms & Conditions before proceeding")
        }
        // let url = "http://transcorp.cregital.com/api/book/"+this.props.data.contentload.property_id;

        // try {
        //   var bodyFormData = new FormData();
        //   bodyFormData.append("start_date", this.props.check_in);
        //   bodyFormData.append("end_date", this.props.check_out);
        //   bodyFormData.append("destination", this.props.destination);
        //   let response = await axios({
        //     method: 'POST',
        //     url: url,
        //    data: bodyFormData,
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //       'Authorization': 'Bearer ' + token

        //     }
        //   });

        //   if (response.data.success) {

        //     setTimeout(() => {
        //       this.setState({
        //         loading: false
        //       })
        //     }, 1000);

        //     this.props.navigator.push({
        //       screen: 'transcorpApp.CompleteBookingScreen',
        //       passProps:{data:response.data.success,check_in:this.props.checkIn,check_out:this.props.checkOut,destination:this.props.destination,token:this.props.token}
        //     });
        //   }
        // } catch (e) {
        //   alert(e);
        //   this.setState({
        //     loading: false,
        //   })
        // }
    }
    _renderHeader(section) {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#FF8300', paddingVertical: 10, width: '85%', fontSize: 16, fontFamily: 'century-gothic-bold' }}>{section.title}</Text>
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
        if (section.content === 1) {
            return (
                <View>
                    <Text style={{ color: '#545454', paddingVertical: 10, fontSize: 16, fontFamily: 'century-gothic' }}>TRANSCORP HOTELS CALABAR</Text>
                    <Text style={{ color: '#545454', paddingVertical: 10, fontSize: 13, fontFamily: 'century-gothic-bold' }}>{section.data.prop_name[0].name}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>Arriving: {section.check_in}</Text>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>Departing: {section.check_out}</Text>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>King, 2 Adult(s)</Text>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>{section.data.price.total_night} Night(s)</Text>
                        </View>

                        <TouchableOpacity onPress={() => {
                            section.this.props.navigator.resetTo({
                                screen: 'transcorpApp.ExploreScreen'
                            });
                        }} >
                            <Text style={{ color: '#FF8300', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic-bold' }}>Edit</Text>

                        </TouchableOpacity>
                        
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>Room cost (Per Night)</Text>
                        </View>

                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>₦{section.data.property.price_per_night}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>Total ({section.data.price.total_night} Nights)</Text>
                        </View>

                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>₦{section.data.price.total_night_price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>Service Charge 10%</Text>
                        </View>

                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>₦{section.data.price.service_charge}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>VAT 5%</Text>
                        </View>

                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>₦{section.data.price.vat}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '85%' }}>
                            <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 12, fontFamily: 'century-gothic' }}>TDL 5%</Text>
                        </View>

                        <Text style={{ color: '#545454', paddingVertical: 5, fontSize: 14, fontFamily: 'century-gothic' }}>₦{section.data.price.tdl}</Text>
                    </View>
                </View>
            );
        }

    }

}
