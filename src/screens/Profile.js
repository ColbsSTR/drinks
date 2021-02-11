import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, ButtonGroup } from 'react-native-elements';
import { H2 } from 'native-base';
import { deviceHeight } from '../assets/styles/dimensions/deviceDimensions';
import COLORS from '../assets/colors';
import { removeLikedDrink } from '../state/Actions/LikedDrinks/removeLikedDrink';
import { addLikedDrink } from '../state/Actions/LikedDrinks/addLikedDrink';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
		}
		this.updateSelectedTab = this.updateSelectedTab.bind(this);
		this.onHeartPress = this.onHeartPress.bind(this);
	}

	updateSelectedTab = (tab) => {
		this.setState({selectedTab: tab});
	};

	onHeartPress(drink, lottieRef) {
		const { docId } = drink;
		const liked = this.props.likedDrinks.includes(docId);
		if (liked) {
		  this.props.removeLikedDrink({ drinkId: docId });
		  lottieRef.current.reset();
		} else {
		  this.props.addLikedDrink({ drinkId: docId });
		  lottieRef.current.play(0,50);
		}
	};

	renderDrinkCards(drink) {
		return (
		  <TouchableOpacity
			onPress={() => {
			  this.props.navigation.navigate('DetailView', {drink});
			}}>
			<DrinkCard drink={drink} onHeartPress={this.onHeartPress} />
		  </TouchableOpacity>
		);
	};

	drinkCards = () => {
		const likedDrinks = this.props.drinks.filter(drink => drink.liked);
		return (
			<FlatList
        data={likedDrinks}
        renderItem={({item}) => this.renderDrinkCards(item) }
      />
		);
	}

	renderSelectedTab = () => {
		switch(this.state.selectedTab) {
			case 0:
				return this.drinkCards();
			case 1:
				return <Text>share me!!</Text>;
			default:
				return;
		}
	}

	likedTabButton = () => <Text>Liked Drinks</Text>
	shareTabButton = () => <Text>Share This App</Text>
	
	render() {
		const { photoURL, displayName } = this.props.user.user || {};
		const { removing } = this.props;
		const { selectedTab } = this.state;
		const buttons = [{ element: this.likedTabButton }, { element: this.shareTabButton }];
		return (
			<View style={ styles.container }>
				<View style={ styles.avatarContainer }>
					<Avatar 
						rounded
						size="large"
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
				<ButtonGroup
					onPress={this.updateSelectedTab}
					selectedIndex={selectedTab}
					buttons={buttons}
					containerStyle={{height: 30}} 
					selectedButtonStyle={{backgroundColor: COLORS.orange}}
				/>
				{ removing && ( <ActivityIndicator size="large" color='gray' /> ) }
				{this.renderSelectedTab()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	avatarContainer: {
    paddingTop: deviceHeight * .03,
    justifyContent: 'center',
    alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	nameContainer: {
		marginVertical: 20,
		alignItems: 'center',
	},
	tabContainer: {
		flex: 1,
	}
});

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user,
		drinks: state.topDeals.deals,
		likedDrinks: state.topDeals.likedDrinks,
		removing: state.likedDrinks.removeLikedDrink.isWaiting,
	}
}

const mapDispatchToProps = {
	removeLikedDrink,
	addLikedDrink,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);