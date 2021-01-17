import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';

class LikedDrinks extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={ styles.container }>
				<Text>This is the like drinks page</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default LikedDrinks;