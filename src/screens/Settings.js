import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Form, Input, Label, Item, Button, Text} from 'native-base';
import COLORS from '../assets/colors';
import {logout} from '../state/Actions/authentication';
import {updateUserDisplayName} from '../state/Actions/User/updateDisplayName';

class Settings extends Component {
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

  updateDisplayName = (newName) => {
    this.props.updateUserDisplayName({name: newName});
  };

  render() {
    const {displayName} = this.props.user;
    return (
      <View style={styles.container}>
        <Form>
          <Item fixedLabel>
            <Label>Display Name</Label>
            <Input
              disabled
              placeholder={displayName}
              onTouchStart={() =>
                this.props.navigation.navigate('UpdateFormField', {
                  fieldValue: displayName,
                  fieldType: 'Display Name',
                  updateFieldValue: this.updateDisplayName,
                })
              }
            />
          </Item>
          {/* <Item fixedLabel>
            <Label>Favorite Drink</Label>
            <Input disabled placeholder=''/>
          </Item> */}
        </Form>
        <View style={{alignSelf: 'center', paddingTop: 10}}>
          <Button
            bordered
            style={{borderColor: COLORS.orange}}
            onPress={() => this.onSignout()}>
            <Text style={{color: COLORS.orange}}>Sign Out</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
  };
};

const mapDispatchToProps = {
  logout,
  updateUserDisplayName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
