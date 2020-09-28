import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, CardItem, Text, Body, ListItem, Left, Right, Icon } from "native-base";
import MapView from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { StarRating } from '../components/StarRating';
import { useDispatch } from "react-redux";
import { showModal } from '../state/Actions/modal';
import ReviewModal from '../components/ReviewModal';

export default Detailview = props => {
	const { item } = props.route.params;
	const dispatch = useDispatch();

    return (
			<ScrollView style={styles.container}>
				<Card style={styles.card1}>
					<CardItem header bordered style={styles.center}>
						<Text>{item.Name}</Text>
					</CardItem>
					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: "green" }}>
								<Icon type="FontAwesome" name="dollar" />
							</Button>
						</Left>
						<Body>
							<Text>Price</Text>
						</Body>
						<Right>
							<Text>${item.Price}</Text>
						</Right>
					</ListItem>
					<ListItem icon>
						<Left>
							<Button>
								<Icon type="FontAwesome" name="location-arrow" />
							</Button>
						</Left>
						<Body>
							<Text>Venue</Text>
						</Body>
						<Right>
							<Text>{item.Venue}</Text>
						</Right>
					</ListItem>
					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: item.open ? "orange" : "red" }}>
								<Icon type="FontAwesome" name={item.open ? "check" : "times"} />
							</Button>
						</Left>
						<Body>
							<Text>Open Currently</Text>
						</Body>
					</ListItem>
					<CardItem>
						<Body>
							<Text>
								{item.Description}
							</Text>
						</Body>
					</CardItem>
				</Card>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
				<View style={{ paddingTop: 30 }}>
					<StarRating
						value={5}
						size={40}
					/>
					<TouchableOpacity onPress={() => dispatch(showModal())}>
						<Text style={{ textAlign: 'center', paddingTop: 20, color: 'blue' }}>
							Add a review
						</Text>
					</TouchableOpacity>
				</View>
				<ReviewModal/>
			</ScrollView>
    );
};

const styles = StyleSheet.create({
	card1: {
		flex: 1,
	},
	card2: {
		flex: 1
	},
	center: {
		alignContent: 'center', 
		justifyContent: 'center'
	},
	container: {
		flex: 1,
		padding: 8
	},
    map: {
		flex: 1,
		aspectRatio: 2/1
    },
	});