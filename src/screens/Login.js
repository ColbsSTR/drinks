import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginAsGuest, login } from '../state/Actions/authentication';
import { LOGO } from '../assets/images/index';
import COLORS from '../assets/colors';
import { facebook, google } from '../language/keys/authentication/signInProvider';
import ClankingDrinks from '../components/ClankingDrinks';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLogin = (type) => {
    this.props.login(type);
  }

  render() {
    const { orange, lightOrange, white, red, black } = COLORS;
    const { isWaiting } = this.props;

    return (
      <LinearGradient colors={[orange, lightOrange]} style={{ flex: 1, justifyContent: 'center' }}>
        { isWaiting ? (
          <ClankingDrinks />
        ) : (
        <>
        <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', paddingBottom: 15 }}>
            <Image
              style={{ height: 100, width: 350, top: 10 }}
              source={ LOGO }
            />
          </View>
          <View style={{padding: 5}}>
            <SocialIcon
              title='Continue With Facebook'
              button
              type='facebook'
              onPress={ () => this.handleLogin(facebook) }
            />
          </View>
          <View style={{padding: 5}}>
            <SocialIcon
              title='Continue With Instagram'
              button
              type='instagram'
            />
          </View>
          <View style={{padding: 5}}>
            <SocialIcon
              title='Continue With Google'
              button
              type='google'
              style={{ backgroundColor: red }}
              onPress={ () => this.handleLogin(google) }
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
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={{ color: black }}>Please drink responsibly</Text>
        </View>
        </>
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

