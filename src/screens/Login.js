import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginAsGuest } from '../state/Actions/authentication';
import { LOGO } from '../assets/images/index';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    let deviceHeight = Dimensions.get('window').height

    return (
      <LinearGradient colors={['#ef8921', '#fbe1c6']} style={{ flex: 1 }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, paddingTop: deviceHeight * .1 }}>
          <View style={{ backgroundColor: 'white', height: '50%' }}>
            <Image
              style={{ height: 100, width: 350, top: 10 }}
              source={ LOGO }
            />
          </View>
        </View>
        <View style={{flex: 1, width: '100%' }}>
          <View style={{padding: 5}}>
            <SocialIcon
              title='Sign In With Facebook'
              button
              type='facebook'
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
            />
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 20 }}>
          <Text
            onPress={() => {
              this.props.loginAsGuest();
            }}
            style={{ color: 'black' }}>
            Continue As Guest
          </Text>
        </View>
      </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = {
  loginAsGuest,
};

export default connect(null, mapDispatchToProps)(Login);
