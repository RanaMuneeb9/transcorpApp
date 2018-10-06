import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TextInput, Button, TouchableOp, Icon, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { singleScreenApplication } from '../styles/navigatorStyles';
import Rating from 'react-native-rating'
import MyLoader from '../components/MyLoader';
var axios = require('axios');

export default class SearchResultScreen extends Component {


  componentWillMount() {
    setTimeout(() => {
      this.loadData()
    }, 500);
  
  }

  async loadData()
  {
    let url = "http://transcorp.cregital.com/api/search";

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("check_in", this.props.checkIn);
      bodyFormData.append("check_out", this.props.checkOut);
      bodyFormData.append("destination", this.props.destination);

      let response = await axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        config: {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      });

      if (response.data.success) {

        this.setState({
          data:response.data.success
        })

        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 3000);
      }
    } catch (e) {
      alert(e);
      this.setState({
        loading: false,
      })
    }


  }

  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      starCount: 2.5,
      destination: '',
      data :null  
    };
  }
  render() {

    const images = {
      starFilled: require('../../assets/star-full.png'),
      starUnfilled: require('../../assets/star-half.png')
    }
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column', justifyContent: 'flex-start'
      }}>

        <MyLoader
          loading={this.state.loading} />

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
            <Image source={require('../../assets/TranscorpIcon-black.png')} />
            <Text style={{ textAlign: 'center', width: '80%', fontSize: 20, color: '#545454', fontFamily: 'century-gothic-bold' }}>SEARCH RESULTS</Text>
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

        <View style={styles.container} >

          <FlatList
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => {
                this.props.navigator.push({
                  screen: 'transcorpApp.RoomDetailsScreen',
                  passProps:{data:item,check_in:this.props.checkIn,check_out:this.props.checkOut,destination:this.props.destination,token:this.props.token}
                });
              }}>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                  <ImageBackground style={{ height: 200 }} source={{uri : 'http://transcorp.cregital.com/images/data/'+item.images[0].image}}>
                    <View style={{ flexDirection: 'row', marginTop: 10,paddingVertical:10,backgroundColor:'rgba(0, 0, 0, 0.5)' }}>
                      <View style={{ width: "70%", marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: 'century-gothic-bold' }}>{item.contentload.name}</Text>
                        <Text style={{ marginTop: 5, fontSize: 14, color: '#F0F0F0', fontFamily: 'century-gothic' }}>{this.props.checkIn} - {this.props.checkOut}</Text>
                        {/* <Rating
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

                        /> */}

                      </View>
                      <View style={{ width: "30%" }}>
                        <View style={{ paddingRight: 20 }}>
                          <Text style={{ paddingHorizontal: 10, paddingTop: 5, textAlign: 'center', fontSize: 14, color: '#FFFFFF', backgroundColor: '#FF8300', fontFamily: 'century-gothic' }}>₦{item.price_per_night}</Text>
                          <Text style={{ paddingHorizontal: 10, paddingBottom: 5, textAlign: 'center', fontSize: 14, color: '#FFFFFF', backgroundColor: '#FF8300', fontFamily: 'century-gothic' }}>Per Night</Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.email}
          />

        </View>
      </View >
    );
  }


  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  }
});