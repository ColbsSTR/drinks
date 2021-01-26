import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Form, Input, Label, Item , Button, Text } from 'native-base';
import COLORS from '../assets/colors';
import { logout } from '../state/Actions/authentication';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
		console.tron.log('unmounting settings');
	}

    onSignout = () => {
        Alert.alert(
            'Are you sure you want to logout?',
            '',
            [
                {
                text: "Cancel",
                style: "cancel"
                },
                { text: "Log Out", onPress: () => this.props.logout() }
            ],
            { cancelable: true }
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <Form>
                    <Item fixedLabel>
                        <Label>First Name</Label>
                        <Input defaultValue='Colby'/>
                    </Item>
                    <Item fixedLabel last>
                        <Label>Last Name</Label>
                        <Input defaultValue='Crowne'/>
                    </Item>
                </Form>
                <View style={{ alignSelf: 'center', paddingTop: 10 }}>
                    <Button bordered style={{ borderColor: COLORS.orange }} onPress={() => this.onSignout()}>
                        <Text style={{ color: COLORS.orange }}>Sign Out</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const mapDispatchToProps = {
    logout,
};

export default connect(null, mapDispatchToProps)(Settings);