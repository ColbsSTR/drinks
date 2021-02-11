import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class DrinkMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 36.066330,
                longitude: -94.166420,
                latitudeDelta: 0.018,
                longitudeDelta: 0.018,
            },
        }
    }

    getMarkerImage = (type) => {
        return {
            'Beer': require('../assets/images/beerBottle.png'),
            'Cocktail': require('../assets/images/cocktailGlass.png'),
            'Wine': require('../assets/images/wineGlass.png'),
            'Margarita': require('../assets/images/cocktailGlass.png'),
        }[type];
    }

    render() {
        return (
                <MapView
                    style={{ 
                    flex: 1,
                    }}
                    region={this.state.region}
                >
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
      topDeals: state.topDeals.deals,
    };
};

export default connect(mapStateToProps)(DrinkMap);
