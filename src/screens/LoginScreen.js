import React, { Component } from 'react';
import { Alert,Dimensions, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import { singleScreenApplication } from '../styles/navigatorStyles';
import final_url from "../data/constants";
import { Navigation } from 'react-native-navigation';
import CheckBox from 'react-native-check-box'
import MyLoader from '../components/MyLoader';
const request = require('superagent');
var axios = require('axios')
import { AsyncStorage } from "react-native";

export default class LoginScreen extends Component {


  static navigatorStyle = singleScreenApplication;

  constructor(props) {
    super(props);


    this.state = {
      loading: false,
      address: '',
      email: '',
      password: '',
      imageheight: Dimensions.get('window').height / 3
    }
  }

  componentWillMount() {


    this.retrieveItem("token").then((tokenz) => {
    if(tokenz!=""){
      this.retrieveItem("username").then((usernamez) => {
        if (tokenz != null || usernamez != null) {
          Navigation.startTabBasedApp({
            tabs: [
              {
                label: 'Explore',
                screen: 'transcorpApp.ExploreScreen',
                icon: require('../../assets/TranscorpIcon.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Eplore.png') // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)

              },
              {
                label: 'Bookings',
                screen: 'transcorpApp.BookingScreen',
                icon: require('../../assets/Bookings-Check-in-out.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Bookings-Check-in-out.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)

              }, {
                label: 'Services',
                screen: 'transcorpApp.ServicesScreen',
                icon: require('../../assets/Services.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Services.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)

              },
              {
                label: 'Profile',
                screen: 'transcorpApp.ProfileScreen',
                icon: require('../../assets/Profile.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Profile.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
                // title: 'Screen Four'
              }
            ],
            appStyle: {
              tabBarBackgroundColor: '#FFFFFF',
              tabBarButtonColor: '#545454',
              tabBarHideShadow: true,
              tabBarSelectedButtonColor: '#FF8300',
              tabBarTranslucent: false,
              tabFontFamily: 'Avenir-Medium',  // existing font family name or asset file without extension which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
              tabFontSize: 14,
              forceTitlesDisplay: true,
              selectedTabFontSize: 16,
            },
            passProps: { username: usernamez, token: tokenz }, // simple serializable object that will pass as props to all top screens (optional)
            animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
          });
        }

      }).catch((error) => {
        alert("Error1");
      });
    }
    }).catch((error) => {
      alert("Error2");
    });


    this.retrieveItem("agreement_status").then((goals) => {
      if (goals != null)
        this.popupDialog.dismiss();
    }).catch((error) => {
      this.popupDialog.show();
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <MyLoader
            loading={this.state.loading} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ flex: 1, height: this.state.imageheight, width: "100%" }} source={require('../../assets/Background.png')} resizeMode="stretch" />
            <Image source={require('../../assets/Transcorplogo.png')} style={{ position: 'absolute', bottom: 20 }} />
          </View>


          <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>

            <TextInput
              style={{ fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
              placeholder="E-mail address"
              placeholderTextColor='#545454'
              underlineColorAndroid="transparent"
              onChangeText={(value) => this.setState({ email: value })}
              height={50}
            />
          </View>
          <View style={{ borderColor: '#F0F0F0', borderWidth: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
            <TextInput
              style={{ fontSize: 14, paddingLeft: 10, fontFamily: 'century-gothic' }}
              placeholder="Password"
              placeholderTextColor='#545454'
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(value) => this.setState({ password: value })}
              height={50}

            />

          </View>


          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30
          }}>
            <TouchableOpacity onPress={() => {
              if (this.state.email == '' || this.state.password == '') {
                alert("Please fill all the details");
              } else {
                this.attemptLogin()
              }
            }
            }
              style={{ width: '40%', backgroundColor: "#FFFFFF", height: 50, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1.2, borderColor: '#545454' }}>
              <Text style={{ textAlign: 'center', color: '#545454', fontSize: 16, fontFamily: 'century-gothic-bold' }}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigator.push({
                screen: 'transcorpApp.SignUpScreen',
                title: ''
              });
            }} style={{ width: '40%', backgroundColor: "#FF8300", height: 50, marginTop: 10, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic-bold' }}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {

            }}>
              <Text style={{ color: '#545454', fontSize: 15, fontFamily: 'century-gothic' }}>Forgot Password ? Reset.</Text>
            </TouchableOpacity>
          </View>

             </ScrollView>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            show={true}
            dismissOnTouchOutside={false}
            width={0.9}
            height={300}
          >


            <View style={{ alignSelf: 'center', alignItems: 'center' }}>

              <Text style={{ color: '#545454', fontSize: 20, marginTop: 40, fontFamily: 'century-gothic-bold' }}>END USER LICENSE AGREEMENT</Text>

              <Text style={{ color: '#545454', fontSize: 15, marginTop: 40, fontFamily: 'century-gothic' }}>Using he Transcorp Hotels app on this device</Text>
              <Text style={{ color: '#545454', fontSize: 15, fontFamily: 'century-gothic' }}>requires you to accept the terms and conditions</Text>

              <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                  this.popupDialog1.show();
                }}>
                  <Text style={{ color: '#FF8300', fontSize: 15, textDecorationLine: 'underline', fontFamily: 'century-gothic' }}>Read Terms</Text>
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
                <Text style={{ textAlign: 'center', color: '#545454', fontSize: 16, fontFamily: 'century-gothic' }}>DECLINE</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.storeItem("agreement_status", '1');
              }} style={{ width: '40%', backgroundColor: "#FF8300", height: 50, marginTop: 10, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic' }}>ACCEPT</Text>
              </TouchableOpacity>

            </View>
          </PopupDialog>


          <PopupDialog
            ref={(popupDialog) => { this.popupDialog1 = popupDialog; }}
            show={false}
            dismissOnTouchOutside={false}
            width={0.9}
            height={500}
          >


            <View style={{ alignSelf: 'center', alignItems: 'center' }}>

              <Text style={{ color: '#545454', fontSize: 20, marginTop: 40, fontFamily: 'century-gothic-bold' }}>END USER LICENSE AGREEMENT</Text>
              <View style={{height: 330,marginHorizontal:20}} >
              <ScrollView>      
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>The terms, conditions and notices set forth herein (hereinafter the â€œTermsâ€) are between you and Transcorp Hotels Plc ("Transcorp Hotels"). These terms set forth the scope of your permissible use of the website page and states the Terms and Conditions under which you may use the website www.transcorphotelsplc.com (referred to as the Site). BY ACCESSING, USING, VIEWING, TRANSMITTING, CACHING OR STORING THIS SITE OR ANY OF ITS SERVICES, FUNCTIONS OR CONTENTS, YOU SHALL BE DEEMED TO HAVE AGREED TO EACH AND ALL OF THE TERMS, CONDITIONS AND NOTICES IN THIS SITE (â€˜â€™ THE AGREEMENTâ€™â€™) WITHOUT MODIFICATION. Please read these Terms and Conditions carefully. If you do not accept the Terms and Conditions stated here, do not use the Site. Transcorp Hotels Plc reserves the right to revise the Terms and Conditions without notice to you. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 5, fontFamily: 'century-gothic-bold' }}>Information on the site</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 5, fontFamily: 'century-gothic' }}>This Site aims to provide commercial information to prospective and current clients. However, personal comments, opinions and views expressed on this Site are not necessarily a representation of the views of Transcorp Hotels Plc, its directors or its clients. Transcorp Hotels Plc is not responsible for any harm, loss, damage or expense incurred by any individual as a result either directly or indirectly of any information published on this Site. In using this Site, you acknowledge and agree that the terms and conditions set forth above are fundamental to the usage of the Site, and that the Site would not be provided to you in the absence of such terms and conditions.</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 5, fontFamily: 'century-gothic-bold' }}>Site content</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>The Site and all its content contained thereon including, images, photography, logos and other materials, and the copyrights, trademarks, trade dress and other intellectual property rights in such materials are owned by Transcorp Hotels or its licensors. The Site or any portion of this Site may not be reproduced, duplicated, copied, sold, resold, or otherwise exploited for any commercial purpose that is not expressly permitted by Transcorp Hotels.</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>User interactions</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>Generally, any communication which you transfer to the Site is considered to be non-confidential. Transcorp Hotels Plc will not guarantee the privacy or confidentiality of any information relating to the user uploaded onto the Site.</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Disclaimer</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>Transcorp Hotels Plc does not claim the Site will operate free of errors or that the Site and its servers are free of possibly harmful elements. Transcorp Hotels Plc, however, will not be liable for any loss, damage, harm or expense incurred by the user arising therefrom  WITHOUT LIMITING THE FOREGOING, TRANSCORP HOTELS MAKE NO REPRESENTATIONS, WARRANTIES OR ENDORSEMENTS OF ANY KIND WHATSOEVER, EXPRESS OR IMPLIED AS TO THE WEBSITE AND THE CONTENT.  IN ADDITION, TRANSCORP HOTELS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, TITLE, CUSTOM, TRADE, AND QUIET ENJOYMENT. EXCEPT AS SET OUT BELOW WITH RESPECT TO TRANSCORP HOTELS, TRANSCORP HOTELS DISCLAIM ANY AND ALL LIABILITIES RELATING TO THE PRODUCTS AND SERVICES YOU MAY VIEW OR PURCHASE FROM THE WEBSITE.  SHOULD YOU HAVE ANY ISSUES WITH THE PRODUCTS OR SERVICES PROVIIDED OR VIEWED VIA SECTION, YOU AGREE THAT YOUR ONLY RECOURSE IS WITH THE MERCHANT WHO PROVIDED THE PRODUCT OR SERVICES, AND NOT TRANSCORP HOTELS. NOTWITHSTANDING THE FOREGOING, THIS DISCLAIMER DOES NOT APPLY TO TRANSCORP HOTELS TRANSCORP HOTELS DOES NOT REPRESENT OR WARRANT THAT USE OF THE APPLICATION WILL BE ERROR-FREE OR UNINTERRUPTED; THAT DEFECTS WILL BE CORRECTED; OR THAT THE WEBSITE OR THE SERVER THAT MAKES THE APPLICATION AVAILABLE IS OR WILL REMAIN FREE FROM ANY HARMFUL COMPONENTS, INCLUDING, WITHOUT LIMITATION, VIRUSES.  TRANSCORP HOTELS DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT THE INFORMATION (INCLUDING ANY INSTRUCTIONS) ON THE WEBSITE IS ACCURATE, COMPLETE, OR USEFUL. YOU ACKNOWLEDGE THAT YOUR USE OF THE WEBSITE IS AT YOUR SOLE RISK.  TRANSCORP HOTELS DOES NOT WARRANT THAT YOUR USE OF THE APPLICATION OR CONTENT IS LAWFUL IN ANY PARTICULAR JURISDICTION, AND TRANSCORP HOTELS SPECIFICALLY DISCLAIM SUCH WARRANTIES.  SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU TO THE EXTENT SUCH JURISDICTION'S LAW IS APPLICABLE TO YOU AND THESE TERMS. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Third party links</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>The Site may contain links to third party Web Sites. These links are provided solely as a convenience to you. Transcorp Hotels Plc is not responsible for the content of linked third party Sites and does not make any representations regarding the content or accuracy of materials on such third-party Web Sites. If you decide to access linked third-party Web Sites, you do so at your own risk and in accordance with the prevailing terms and conditions and privacy policies of third party Sites. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Governing Law</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>Any disputes, claims or proceedings arising out of or in any way relating to the materials or the Site shall be governed by the laws of the Federal Republic of Nigeria. The Nigerian Courts shall have exclusive jurisdiction for the purpose of any proceedings arising out of or in any way relating to the materials or the Site. If any provision of the Terms and Conditions is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of the Terms and Conditions, which shall remain in full force and effect. No waiver of any term of the Terms and Conditions shall be deemed a further or continuing waiver of such term or any other term. Transcorp Hotels Plc may at any time and without liability modify, suspend or discontinue the Site or any materials (or any part or specification thereof), with or without notice, for any valid technical, operational or commercial reasons. These Terms and Conditions constitute the entire agreement between you and Transcorp Hotels Plc with respect to the use of the Site.</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Privacy Policy</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>We at Transcorp Hotels Plc treat the privacy of our visitors with the highest importance. This policy details the measures we take to preserving and safely guarding your privacy when you visit or communicate with our Site or personnel. The Privacy Policy here has been approved and provided by our legal advisors. A detailed explanation of how we may store or otherwise use personal information about you is explained in this Privacy Policy. Regular updates of the Privacy Policy are completed, requiring you to check back on this Policy from time to time. Information Collection Operation of this Site may require collection and processing of the following data: 1.1 Visit details to our Site or any resources used on our Site are not limited to just location and traffic data, weblogs or other communication information. 1.2 Information given to us when you contact us for any reason. 1.3 Data offered by filled out forms on our Site, like a registration or purchase. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Cookies</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>Our advertisers and organisation may have the occasion to collect information with regards to your computer for our services. The information is gained in a statistical manner for our use or advertisers on our Site. Data gathered will not identify you personally. It is strictly aggregate statistical data about our visitors and how they used our resources on the Site. No identifying personal information will be shared at any time via cookies. Close to the above, data gathering can be about general online use through a cookie file. When used, cookies are automatically placed in your hard drive where information transferred to your computer can be found. These cookies are designed to help us correct and improve our Siteâ€™s services or products for you. You may elect to decline all cookies via your computer. Every computer has the ability to decline file downloads like cookies. Your browser has an option to enable the declining of cookies. If you do decline cookie downloads you may be limited to certain areas of our Site, as there are parts of our Site that require cookies. Any of our advertisers may also have a use for cookies. We are not responsible, nor do we have control of the cookies downloaded from advertisements. They are downloaded only if you click on the advertisement. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Your information and how it is used</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>Primarily, we collect and store data about you to help us provide better service and products to you. The following are purposes we may use your information for: 9.1 At any time you request information from us via a form or other electronic transmission we may use your information to fulfil that request relating to our services and products. We may also communicate with you on other products or services you may find of interest, only when consent has been provided. 9.2 Contracts we make with you create a commitment, which may require contact or use of your information. 9.3 We have the discretion to notify you of changes to our Site, products or services that could affect our service to you. 9.4 Information on products or services similar to those of an existing consumer purchase may be communicated to you. The information sent to you in a communication will be similar to the subject of a recent sale. 9.5 We may also use your information or allow a third-party use of this data, to offer you information about unrelated products or services you may be interested in. We or third parties can only communicate if you have consented to such communication and data use. 9.6 New consumers can be contacted via our Site or by third parties only if consent has been granted, and only for those communications you have granted. 9.7 An opportunity for declining your consent is provided on our Site. Use this opportunity to withhold your details from us or third parties, regarding data we may collect. 9.8 Be aware we do not reveal identifiable information about you to our advertisers, though we may at times share statistical visitor information with our advertisers. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Storage of personal data</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>10.1Information submitted by you is stored on secure servers we have. Any payment or transaction details will be encrypted for full safety measures to be in use. 10.2 As you know, transmission of data on the internet is never guaranteed regarding safety. It is impossible to guarantee your safety with electronic data and transmission. You are therefore at your own risk if you elect to transmit any data. When offered you may create a password, but you are responsible for keeping it confidential. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Information sharing</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>If necessary, we may share personal information to our group members including such entities as subsidiaries, holding companies and their subsidiaries. Information is shared only when applicable. 11.2 Third party disclosure may be necessary in regard to personal information: 11.2.1 A sale of our business or its assets, in full or part, to a third party may require personal data sharing. 11.2.2 Legally, we may be asked to share and disclose data details. 11.2.3 To assist in reducing credit risk and fraud protection. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Indemnity</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>You agree to indemnify and hold Transcorp Hotels and their respective affiliates, officers, directors, agents and employees harmless from any claim or demand, including reasonable attorney's fees, made by any third party due to or arising out of your use of the Site, your breach of these terms and conditions or your violation of any law or the rights of a third party. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Third party links</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>If necessary, we may share personal information to our group members including such entities as subsidiaries, holding companies and their subsidiaries. Information is shared only when applicable. 11.2 Third party disclosure may be necessary in regard to personal information: 11.2.1 A sale of our business or its assets, in full or part, to a third party may require personal data sharing. 11.2.2 Legally, we may be asked to share and disclose data details. 11.2.3 To assist in reducing credit risk and fraud protection. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Accessing information</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>The Freedom of Information Act 2011 provides you with the right to access the information that we collect about you. Please note any demand for access may be subject to a fee which covers our costs in providing you with the data requested. The contact information below needs to be used to request access about details we collect and store on you. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Contact Information</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>If you have any questions about these Terms or the Website, please contact Providers at info@transcorphotelsplc.com 1 Aguiyi Ironsi Street Maitama, Abuja  </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Severability</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>These terms shall be deemed severable. In the event that any provision is determined to be unenforceable or invalid such provision shall nonetheless be enforced to the fullest extent permitted by law, and such determination shall not affect the validity and enforceability of the remaining provisions.  </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>Cancellation policy for transactions</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>All standard cancellation policies for rooms and amenities offered by a Hotel apply to any reservations, orders or purchases of goods or services from Transcorp hotels website.  By reserving, ordering or otherwise purchasing goods or services with or from Transcorp Hotels website, you agree to be bound by all of the Hotelâ€™s standard cancellation policies and by any other policies that may apply.  Failure to provide timely cancellation notice for goods or services ordered or reserved from Hotel may result in a cancellation penalty charged to your room or credit card, at the sole discretion of the Hotel. Any cancellation on guaranteed booking received after 4.00pm on the date of arrival will attract 50% charge and 100% will be chargeable on cancellation after 6.00pm on the date of arrival. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>GENERAL PROHIBITIONS AND ENFORCEMENT RIGHTS</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>In connection with your use of the website or its content or exercise of any rights under these Terms, and except as provided herein or as otherwise agreed to in writing by the Transcorp Hotels, you agree not to do any of the following: â€¢ Post, upload, publish, submit, or transmit any Content; â€¢ Infringe , misappropriate or violate a third partyâ€™s patent, copyright, trademark, service mark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy; â€¢ Use the Transcorp Hotelâ€™s patents, copyrights, trademarks, service marks, logos, trade secrets, moral rights or other intellectual property or proprietary information (hereinafter â€œTranscorp Hotels IPâ€), including but not limited to in or as part of meta tags or other hidden text or metadata;  â€¢ Remove, alter or obscure any copyright, trademark, service mark or other proprietary rights notices incorporated in or accompanying the Website or its Content; â€¢ Infringe, violate or otherwise interfere with or challenge Transcorp Hotels rights in the website, Content or Transcorp Hotels IP;  â€¢ Engage in or encourage any conduct that (i) violates, any applicable law or regulation or would give rise to civil liability; (ii) is fraudulent, false, misleading or deceptive; (iii) is defamatory, obscene, pornographic, vulgar or offensive; (iv) promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group; (v) is violent or threatening or promotes violence or actions that are threatening to any person or entity; or (vi) promotes illegal or harmful activities or substances; â€¢ Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, sublicense, create derivate works from, transfer, lease, lend or rent any information, software or hardware obtained through use of the Website;  â€¢ Display, mirror or frame the Website or any individual element within the website, including but not limited to the layout and design of any page or form contained on the website;   â€¢ Make the functionality of the website available to multiple users through any means; â€¢ Decipher, decompile, disassemble or reverse engineer any of the software used in connection with the website or its Content; â€¢ Interfere with, or attempt to interfere with, the access of any user, host or network, including, without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing the website; â€¢ Attempt to access or search the Website or its Content or download Content from the websitethrough the use of any engine, software, tool, agent, device or mechanism (including spiders, robots, crawlers, data mining tools or the like) other than the software and/or search agents provided by Transcorp Hotels or other generally available third-party web browsers;  â€¢ Use the website or its Content, or any portion thereof, for any commercial purpose or for the benefit of any third party;  â€¢ Use the website or its Content to send altered, deceptive or false source-identifying information;  â€¢ Collect or store any personally identifiable information from the website from other users of the website without their express permission;  â€¢ Forge any TCP/IP packet header or any part of the header information in any email or newsgroup posting; â€¢ Impersonate or misrepresent your affiliation with any person or entity;  â€¢ Violate any applicable law or regulationÂ¸ including any U.S. or foreign export laws or regulations, including by exporting or re-exporting or using for any purpose the website or any technical data related thereto directly or indirectly in violation of or in a manner otherwise prohibited by such laws and regulations; or â€¢ Encourage or enable any other individual to do any of the foregoing. Transcorp Hotels has the rightto monitor access to or use of the website or its Content or to review or edit any Content for the purpose of operating the website, to ensure compliance with these Terms, and to comply with applicable law or other legal requirements.  Transcorp Hotels reserve the right to remove or disable access to any Content, at any time and without notice, including, but not limited to, if Transcorp Hotels, at its sole discretion, consider any Content to be objectionable or in violation of these Terms.  Transcorp Hotels have the right to investigate violations of these Terms or conduct that affects the website. Transcorp Hotels may also consult and cooperate with law enforcement authorities to prosecute users who violate the law. </Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic-bold' }}>General</Text>
                <Text style={{ color: '#545454', fontSize: 14, marginTop: 20, fontFamily: 'century-gothic' }}>You may not assign or transfer these Terms, by operation of law or otherwise, without Transcorp Hotels written consent. Any attempt by you to assign or transfer these Terms, without such consent, will be null. Transcorp Hotels may freely assign or transfer these Terms without restriction. Subject to the foregoing, these Terms will bind and inure to the benefit of the parties, their successors and permitted assigns.
Any notices or other communications provided by Transcorp Hotels under these Terms, including those regarding modifications to these Terms, will be given: (i) via email; or (ii) by posting to the Application. For notices made by e-mail, the date of receipt will be deemed the date on which such notice is transmitted. </Text>
            </ScrollView>

            </View>

            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20
            }}>

              <TouchableOpacity onPress={() => {
                this.popupDialog1.dismiss();
                this.popupDialog.dismiss();
              }} style={{ width: '40%', backgroundColor: "#FFFFFF", height: 50, marginTop: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1.2, borderColor: '#545454' }}>
                <Text style={{ textAlign: 'center', color: '#545454', fontSize: 16, fontFamily: 'century-gothic' }}>DECLINE</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                  this.popupDialog1.dismiss();
                  this.popupDialog.dismiss();
                  this.storeItem("agreement_status", '1');
              }} style={{ width: '40%', backgroundColor: "#FF8300", height: 50, marginTop: 10, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'century-gothic' }}>ACCEPT</Text>
              </TouchableOpacity>

            </View>
          </PopupDialog>
     
      </View >
    );
  }

  async attemptLogin() {

    this.setState({
      loading: true
    });

    let url = "http://transcorp.cregital.com/api/login";

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("email", this.state.email);
      bodyFormData.append("password", this.state.password);
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
        this.storeItem("token", response.data.success.token);
        this.storeItem("username", response.data.success.username);
        this.storeItem("email", response.data.success.email);
        setTimeout(() => {

          Navigation.startTabBasedApp({
            tabs: [
              {
                label: 'Explore',
                screen: 'transcorpApp.ExploreScreen',
                icon: require('../../assets/TranscorpIcon.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Eplore.png') // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)

              },
              {
                label: 'Bookings',
                screen: 'transcorpApp.BookingScreen',
                icon: require('../../assets/Bookings-Check-in-out.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Bookings-Check-in-out.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)

              }, {
                label: 'Services',
                screen: 'transcorpApp.ServicesScreen',
                icon: require('../../assets/Services.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Services.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)

              },
              {
                label: 'Profile',
                screen: 'transcorpApp.ProfileScreen',
                icon: require('../../assets/Profile.png'), // local image asset for the tab icon unselected state (optional on iOS)
                selectedIcon: require('../../assets/Profile.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
                // title: 'Screen Four'
              }
            ],
            appStyle: {
              tabBarBackgroundColor: '#FFFFFF',
              tabBarButtonColor: '#545454',
              tabBarHideShadow: true,
              tabBarSelectedButtonColor: '#FF8300',
              tabBarTranslucent: false,
              tabFontFamily: 'Avenir-Medium',  // existing font family name or asset file without extension which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
              tabFontSize: 14,
              forceTitlesDisplay: true,
              selectedTabFontSize: 16,
            },
            passProps: { username: response.data.success.username, token: response.data.success.token }, // simple serializable object that will pass as props to all top screens (optional)
            animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
          });


          this.setState({
            loading: false,
          })
        }, 1000);
      }
    } catch (e) {
      Alert.alert("Login Failed", "Check credentials and try again");
      this.setState({
        loading: false
      })
    }


  }


  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      // const item = JSON.parse(retrievedItem);
      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  async storeItem(key, item) {
    this.popupDialog.dismiss();
    console.log(key + " " + item);
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, item);
      console.log(jsonOfItem);
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
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
  }
});
