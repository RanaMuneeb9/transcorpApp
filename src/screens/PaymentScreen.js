import React, { Component } from 'react';
import { WebView, Text, View, StyleSheet, Image, TextInput, Button, TouchableOp, Icon, ImageBackground, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
var axios = require('axios');
import PopupDialog from 'react-native-popup-dialog';

export default class PaymentScreen extends Component {


    static navigatorStyle = singleScreenApplication;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            starCount: 2.5,
            destination: '',
            data: null
        };
    }


    componentWillMount() {
        this.loadData(this.props.token)
    }

    async loadData(token) {


    }

    render() {
        return (
            <WebView
                    source={
                        {
                            uri: 'http://transcorp.cregital.com/mobile/pay?property_id='+this.props.data.property.id+'&start_date='+this.props.check_in+'&end_date='+this.props.check_out+'&apply_point='+this.props.apply_points+'&amount='+this.props.grand_total+'&user_id='+this.props.data.property.user_id+'&guest_number=2&notes='+this.props.notes+'&auth_token='+this.props.token+'&firstname='+this.props.first_name+'&lastname='+this.props.last_name+'&email='+this.props.email+'&phone='+this.props.phone+'&title='+this.props.title+"&bookingGetemails="+this.props.bookingGetemails
                        }
                    }
                    onNavigationStateChange={(e) => {
                         console.warn("current state is ", e.url);

                         if(e.url.indexOf("thank-you") > -1)
                         {
                            setTimeout(() => {
                                this.props.navigator.popToRoot({
                                    animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                                  });
                            }, 6000);     
                         }
                     }}
                    style={{ marginTop: 20 }}
                />
        );
    }
}