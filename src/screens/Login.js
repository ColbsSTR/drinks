import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginAsGuest } from '../state/Actions/authentication';
import { LOGO } from '../assets/images/index';
import COLORS from '../assets/colors';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    let deviceHeight = Dimensions.get('window').height
    const { mediumGrey, lightGrey, white, red } = COLORS;
    return (
      <LinearGradient colors={[mediumGrey, lightGrey]} style={{ flex: 1 }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, paddingTop: deviceHeight * .1 }}>
          <View style={{ height: '50%' }}>
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
              style={{ backgroundColor: red }}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 20 }}>
          <Text
            onPress={() => {
              this.props.loginAsGuest();
            }}
            style={{ color: white }}>
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