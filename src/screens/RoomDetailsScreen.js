import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import Rating from 'react-native-rating';
import ImageSlider from 'react-native-image-slider';
var axios = require('axios')
import MyLoader from '../components/MyLoader';


export default class RoomDetailsScreen extends Component {

  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      address: '',
      images1 : null
    }
  }

  componentWillMount()
  {
    var arr=[];
    for(var i=0;i<Object.keys(this.props.data.images).length;i++)
    {
      arr.push('http://transcorp.cregital.com/images/data/'+this.props.data.images[i].image);
    }
     this.setState({
      images1:arr
    })
  }

  async attemptBooking(token) {

   
      this.setState({
        loading: true
      });

    let url = "http://transcorp.cregital.com/api/book/"+this.props.data.contentload.property_id;

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("start_date", this.props.check_in);
      bodyFormData.append("end_date", this.props.check_out);
      bodyFormData.append("destination", this.props.destination);
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

      // alert(JSON.stringify(response.data.success));
      if (response.data.success) {
       
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 1000);

        this.props.navigator.push({
          screen: 'transcorpApp.CompleteBookingScreen',
          passProps:{data:response.data.success,check_in:this.props.check_in,check_out:this.props.check_out,destination:this.props.destination,token:this.props.token}
        });
      }
    } catch (e) {
      alert(e);
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const regex = /(<([^>]+)>)/ig;
    const images = {
      starFilled: require('../../assets/star-full.png'),
      starUnfilled: require('../../assets/star-half.png')
    }
    return (
      <View style={{ flex: 1 }}>
       <MyLoader
          loading={this.state.loading} />
        <View style={{ flex: 1 }}>
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
              <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454',fontFamily: 'century-gothic-bold' }}>ROOM DETAILS</Text>
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


          <View style={styles.slider}>
            <ImageSlider
              loopBothSides
              autoPlayWithInterval={3000}
              images={this.state.images1}

            />
          </View>



          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <ScrollView>
              <Text style={{ marginTop: 20, fontSize: 20, color: '#545454',fontFamily: 'century-gothic-bold' }}>{this.props.data.contentload.name.toUpperCase()}, {this.props.data.location.city.toUpperCase()}</Text>
              <Rating
                onChange={rating => console.log(rating)}
                selectedStar={images.starFilled}
                unselectedStar={images.starUnfilled}
                stagger={80}
                maxScale={1.4}
                starStyle={{
                  width: 20,
                  height: 20,
                  marginTop: 10
                }}
                initial={4}
                editable={false}

              />
              <Text style={{ marginTop: 20, fontSize: 14, color: '#545454',fontFamily: 'century-gothic' }}>{(this.props.data.contentload.description).replace(regex,'')}</Text>

            </ScrollView>

          </View>
          </ScrollView>
          
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,

        }}>
          <TouchableOpacity onPress={() => {
            this.attemptBooking(this.props.token)
          }} style={{ width: '90%', marginLeft: 20, marginRight: 20, backgroundColor: "#FF8300", height: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF',  fontSize: 16,fontFamily: 'century-gothic-bold' }}>BOOK THIS ROOM</Text>
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
  slider: { height: 250 },
});
