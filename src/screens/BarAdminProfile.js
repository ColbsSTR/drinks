import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Item, Text, Label, Form} from 'native-base';
import {sendNotification} from '../state/Actions/sendNotification';
import {logout} from '../state/Actions/authentication';
import COLORS from '../assets/colors';

const initialState = {
  NotifHeader: null,
  NotifBody: null,
};
class BarAdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleSendNotif = () => {
    const {NotifHeader, NotifBody} = this.state;
    this.props.sendNotification({
      Header: NotifHeader,
      Body: NotifBody,
    });
    this.setState({
      NotifHeader: null,
      NotifBody: null,
    });
    console.log('handlesendnotif');
  };

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
      <View>
        <Form>
          <Item floatingLabel>
            <Label>Notification Header</Label>
            <Input
              value={this.state.NotifHeader}
              onChangeText={(notifHeader) =>
                this.setState({NotifHeader: notifHeader})
              }
            />
          </Item>
          <Item floatingLabel>
            <Label>Notification Body</Label>
            <Input
              value={this.state.NotifBody}
              onChangeText={(notifBody) =>
                this.setState({NotifBody: notifBody})
              }
            />
          </Item>
          <Button
            bordered
            style={styles.button}
            onPress={() => this.handleSendNotif()}>
            <Text style={{color: COLORS.orange}}>Send Notification</Text>
          </Button>
        </Form>
        <Button bordered style={styles.button} onPress={() => this.onSignout()}>
          <Text style={{color: COLORS.orange}}>Sign Out</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: COLORS.orange,
  },
});

const mapDispatchToProps = {
  sendNotification,
  logout,
};

export default connect(null, mapDispatchToProps)(BarAdminProfile);
