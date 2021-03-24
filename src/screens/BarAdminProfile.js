import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import {logout} from '../state/Actions/authentication';
import COLORS from '../assets/colors';

class BarAdminProfile extends Component {
  constructor(props) {
    super(props);
  }

  onSignout = () => {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Log Out', onPress: () => this.props.logout()},
      ],
      {cancelable: true},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          bordered
          style={{borderColor: COLORS.orange}}
          onPress={() => this.onSignout()}>
          <Text style={{color: COLORS.orange}}>Sign Out</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(BarAdminProfile);
