import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Image
            style={{height: 100, width: 100}}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={{flex: 1, width: '100%'}}>
          <View style={{padding: 10}}>
            <Button full style={{padding: 20}}>
              <Text>Facebook</Text>
            </Button>
          </View>
          <View style={{padding: 10}}>
            <Button full>
              <Text>Instagram</Text>
            </Button>
          </View>
          <View style={{padding: 10}}>
            <Button full>
              <Text>Google</Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 1, padding: 20}}>
          <Text
            onPress={() => {
              this.props.navigation.navigate('TopDeals');
            }}
            style={{color: 'blue'}}>
            Continue As Guest
          </Text>
        </View>
      </View>
    );
  }
}

export default Login;
