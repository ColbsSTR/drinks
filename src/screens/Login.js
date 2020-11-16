import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginAsGuest } from '../state/Actions/authentication';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    let deviceHeight = Dimensions.get('window').height

    return (
      <LinearGradient colors={['#dd5e89', '#f7bb97']} style={{ flex: 1 }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, paddingTop: deviceHeight * .1}}>
          <Image
            style={{height: 100, width: 100}}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
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
        <View style={{flex: 1, padding: 20}}>
          <Text
            onPress={() => {
              this.props.loginAsGuest();
            }}
            style={{color: 'black'}}>
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
