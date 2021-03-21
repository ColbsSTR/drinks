import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Icon } from 'native-base';
import COLORS from '../assets/colors';

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

