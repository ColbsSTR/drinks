import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginAsGuest, login } from '../state/Actions/authentication';
import { LOGO } from '../assets/images/index';
import COLORS from '../assets/colors';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleFacebookLogin = () => {
    this.props.login();
  }

  render() {
    const { orange, lightOrange, white, red } = COLORS;
    const { isWaiting } = this.props;

    return (
      <LinearGradient colors={[orange, lightOrange]} style={{ flex: 1, justifyContent: 'center' }}>
        { isWaiting ? ( 
          <ActivityIndicator size="large" color='white' /> 
        ) : (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', paddingBottom: 15 }}>
            <Image
              style={{ height: 100, width: 350, top: 10 }}
              source={ LOGO }
            />
          </View>
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
        )}
      </LinearGradient>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isWaiting: state.authentication.isWaiting
  }
};

const mapDispatchToProps = {
  loginAsGuest,
  login,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Login);

