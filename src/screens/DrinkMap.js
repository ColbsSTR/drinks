import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import isLocationAvailable from '../services/isLocationAvailable';
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
        }
    }

    componentDidMount() {
        this.props.currentLocation && this.setState({ 
            region: { 
                latitude: this.props.currentLocation.coords.latitude, 
                longitude: this.props.currentLocation.coords.longitude, 
                latitudeDelta: 0.040, 
                longitudeDelta: 0.040,
            },
        });
    }

    getMarkerImage = (type) => {
        return {
            'Beer': require('../assets/images/beerBottle.png'),
            'Cocktail': require('../assets/images/cocktailGlass.png'),
            'Wine': require('../assets/images/wineGlass.png'),
            'Margarita': require('../assets/images/cocktailGlass.png'),
        }[type];
    }

    currentLocationMarker = () => {
        const { latitude, longitude } = this.props.currentLocation.coords;
        return (
            <Marker
                coordinate={{ latitude, longitude }}
            >
                <Image
                    source={require('../assets/images/currentLocation.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
            </Marker>
        );
    }

    render() {
        return (
                <MapView
                    style={{ 
                    flex: 1,
                    }}
                    region={this.state.region}
                >
                    {this.props.currentLocation && this.currentLocationMarker()}
                    {this.props.topDeals.map((drink, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: drink.Location._latitude, longitude: drink.Location._longitude}}
                            title={`$${drink.Price} ` + drink.Name}
                            description={drink.Venue}
                            onCalloutPress={() => this.props.navigation.navigate('DetailView', {drink})}
                        >
                            <Image
                                source={this.getMarkerImage(drink.Type)}
                                style={{ width: 50, height: 50 }}
                                resizeMode="contain"
                            />
                        </Marker>
                    ))}
                </MapView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      topDeals: state.drinks.allDrinks,
      currentLocation: state.location.currentLocation,
    };
};

export default connect(mapStateToProps)(DrinkMap);

