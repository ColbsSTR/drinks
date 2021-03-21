import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Icon } from 'native-base';
import COLORS from '../assets/colors';
import { TextInput } from 'react-native-gesture-handler';

class DrinkMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 36.066330,
                longitude: -94.166420,
                latitudeDelta: 0.020,
                longitudeDelta: 0.020,
            },
            filteredDrinks: [],
            venues: [],
        }
    }

    componentDidMount() {
        this.setState({
            filteredDrinks: this.props.topDeals,
        });
        this.props.currentLocation && this.setState({ 
            region: { 
                latitude: this.props.currentLocation.coords.latitude, 
                longitude: this.props.currentLocation.coords.longitude, 
                latitudeDelta: 0.040, 
                longitudeDelta: 0.040,
            },
        });
        this.createVenueArray();
    }

    createVenueArray = () => {
        const { topDeals } = this.props;
        const venues = [];
        _.forEach(topDeals, drink => {
            venues.push(drink.Venue);
        });
        this.setState({ venues });
    }

    getMarkerImage = (type) => {
        return {
            'Beer': 'beer',
            'Cocktail': 'cocktail',
            'Wine': 'wine-glass',
            'Margarita': 'cocktail',
        }[type];
    }

    currentLocationMarker = () => {
        const { latitude, longitude } = this.props.currentLocation.coords;
        return (
            <Marker
                coordinate={{ latitude, longitude }}
            >
                <Icon 
                    name='location-arrow'
                    type='FontAwesome' 
                    style={{ color: COLORS.blue }}
                    size={100}
                />
            </Marker>
        );
    }

    renderDrinkMarkers = (drink, index) => {
        return (
            <Marker
                key={index}
                coordinate={{ latitude: drink.Location._latitude, longitude: drink.Location._longitude}}
                title={ typeof drink.Price === 'number' ? `$${drink.Price} ` + drink.Name : `${drink.Price} ` + drink.Name}
                description={drink.Venue}
                onCalloutPress={() => this.props.navigation.navigate('DetailView', {docId: drink.docId})}
            >
               <Icon 
                    name={this.getMarkerImage(drink.Type)} 
                    type='FontAwesome5' 
                    style={{ color: COLORS.red }}
                />
            </Marker>
        );
    }

    filterDrinks = (text) => {
        const { topDeals } = this.props;
        if (text === '') {
            this.setState({ filteredDrinks: topDeals });
        } else {
            const filteredDrinks = [];
            _.forEach(topDeals, drink => {
                let sanitizedName = drink.Name.toLowerCase();
                let sanitizedText = text.toLowerCase();
                if(sanitizedName.includes(sanitizedText)) {
                    filteredDrinks.push(drink);
                }
            });
            this.setState({ filteredDrinks });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ 
                        flex: 1,
                    }}
                    region={this.state.region}
                >
                    {this.props.currentLocation && this.currentLocationMarker()}
                    {this.state.filteredDrinks.map((drink, index) => this.renderDrinkMarkers(drink, index))}
                </MapView>
                <View style={styles.searchContainer}>
                    <TextInput 
                        placeholder='Search By Drink Name'
                        placeholderTextColor='#000'
                        style={{ flex: 1, padding: 0 }}
                        onChangeText={(text) => this.filterDrinks(text)}
                    />
                    <Icon 
                        name='search'
                        style={{ fontSize: 22 }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: '90%',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        backgroundColor: COLORS.backgroundWhite,
        borderRadius: 5,
        padding: 10,
        shadowRadius: 5,
        shadowColor: COLORS.darkGrey,
        shadowOpacity: .5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 10,
    },  
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25/2,
        backgroundColor: COLORS.orange,
    }
});

const mapStateToProps = (state) => {
    return {
      topDeals: state.drinks.allDrinks,
      currentLocation: state.location.currentLocation,
    };
};

export default connect(mapStateToProps)(DrinkMap);


