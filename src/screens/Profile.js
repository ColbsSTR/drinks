import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { H2 } from 'native-base';
import { deviceHeight } from '../assets/styles/dimensions/deviceDimensions';
import COLORS from '../assets/colors';
import LikedDrinks from './LikedDrinks';

const Tab = createMaterialTopTabNavigator();

class Profile extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const { photoURL, displayName } = this.props.user.user;
		return (
			<View style={ styles.container }>
				<View style={ styles.avatarContainer }>
					<Avatar 
						rounded
						size="xlarge"
						source={{
							uri:
								photoURL ? photoURL : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
						}}
					/>
					<View style={ styles.nameContainer }>
						<H2 style={{ fontWeight: '600', color: COLORS.darkGrey }}>
							{ displayName }
						</H2>
					</View>
				</View>
				{/* <View style={{ flex: 1 }}>
					<Tab.Navigator>
						<Tab.Screen name="Liked Drinks" component={ LikedDrinks }/>
					</Tab.Navigator>
				</View> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	avatarContainer: {
		flex: 1,
		paddingTop: deviceHeight * .15,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nameContainer: {
		marginTop: 20,
		alignItems: 'center',
	}
});

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user,
	}
}

export default connect(mapStateToProps)(Profile);