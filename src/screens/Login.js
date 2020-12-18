import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import auth from '@react-native-firebase/auth';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginAsGuest, loginSucceeded } from '../state/Actions/authentication';
import { LOGO } from '../assets/images/index';
import COLORS from '../assets/colors';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions(["public_profile"]);
    if (result.isCancelled) {
      return;
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    const user = await auth().signInWithCredential(facebookCredential);

    if (!user) {
      throw 'Something went wrong trying to access your profile...';
    }

    //Set user state and login to the app
    this.props.loginSucceeded(user);
  }

  render() {
    let deviceHeight = Dimensions.get('window').height
    const { orange, lightOrange, white, red } = COLORS;
    return (
      <LinearGradient colors={[orange, lightOrange]} style={{ flex: 1 }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 2, paddingTop: deviceHeight * .1 }}>
            <View style={{ height: '50%' }}>
              <Image
                style={{ height: 100, width: 350, top: 10 }}
                source={ LOGO }
              />
            </View>
          </View>
          <View style={{flex: 3, width: '100%' }}>
            <View style={{padding: 5}}>
              <SocialIcon
                title='Sign In With Facebook'
                button
                type='facebook'
                onPress={ this.handleFacebookLogin }
              />
            </View>
            <View style={{padding: 5}}>
              <SocialIcon
                title='Sign In With Instagram'
                button
                type='instagram'
              />
            </View>
            <View style={{padding: 5}}>
              <SocialIcon
                title='Sign In With Google'
                button
                type='google'
                style={{ backgroundColor: red }}
              />
            </View>
            <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                onPress={() => {
                  this.props.loginAsGuest();
                }}
                style={{ color: white }}>
                Continue As Guest
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = {
  loginAsGuest,
  loginSucceeded,
};

export default connect(null, mapDispatchToProps)(Login);

