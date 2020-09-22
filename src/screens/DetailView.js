import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, CardItem, Text, Body, ListItem, Left, Right, Icon } from "native-base";
import MapView from 'react-native-maps';

export default Detailview = props => {
    const { item } = props.route.params;

    return (
		<View style={styles.container}>
			<Card style={styles.card1}>
				<CardItem header bordered style={styles.center}>
					<Text>{item.name}</Text>
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
                		<Text>${item.price}</Text>                        
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
						<Text>{item.venue}</Text>
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
							{item.description}
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
			{/* **TODO** */}
			{/* (REVIEWS HERE) NEEDS TO BE ANOTHER COMPONENT*/}
			{/* 1. OVERALL STARS GOING ACROSS */}
		</View>
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
    },
  });