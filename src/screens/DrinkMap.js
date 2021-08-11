import React, {Component} from 'react';
import {View, StyleSheet, Platform, ScrollView, Switch} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import {Icon, Text} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import COLORS from '../assets/colors';
import DrinkSnippetCard from '../components/DrinkSnippetCard';
import {currentAvailability} from '../utilities/drinkAvailability';

import AsyncStorage from '@react-native-async-storage/async-storage';

class DrinkMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 36.06633,
        longitude: -94.16642,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      filteredDrinks: [],
      venues: [],
      selectedVenueDrinks: null,
      onlyShowAvailable: false,
    };
  }

  componentDidMount() {
    this.setState({
      filteredDrinks: this.props.topDeals,
    });
    this.props.currentLocation &&
      this.setState({
        region: {
          latitude: this.props.currentLocation.coords.latitude,
          longitude: this.props.currentLocation.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
      });
    this.getToggleFromAsync();
    this.createVenueArray();
  }

  getToggleFromAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('@onlyShowAvailableDrinksToggle');
      if (value !== null) {
        this.setState({onlyShowAvailable: value === 'true'});
      }
    } catch (e) {
      console.tron.log('error getting toggle');
    }
  };

  createVenueArray = () => {
    const {topDeals} = this.props;
    const venues = [];
    _.forEach(topDeals, (drink) => {
      if (venues.length > 0) {
        const drinkVenue = venues.find(({name}) => name === drink.Venue);
        if (drinkVenue) {
          const {name, drinks} = drinkVenue;
          const venueIndex = venues.findIndex((venue) => venue.name === drink.Venue);
          const updatedDrinkVenue = {name, drinks: [...drinks, drink]};
          venues.splice(venueIndex, 1, updatedDrinkVenue);
        } else {
          venues.push({
            name: drink.Venue,
            drinks: [drink],
          });
        }
      } else {
        venues.push({
          name: drink.Venue,
          drinks: [drink],
        });
      }
    });
    this.setState({venues});
  };

  getMarkerImage = (type) => {
    return {
      Beer: 'beer',
      Cocktail: 'cocktail',
      Wine: 'wine-glass',
      Margarita: 'cocktail',
    }[type];
  };

  currentLocationMarker = () => {
    const {latitude, longitude} = this.props.currentLocation.coords;
    return (
      <Marker coordinate={{latitude, longitude}}>
        <Icon name="location-arrow" type="FontAwesome" style={{color: COLORS.blue}} size={100} />
      </Marker>
    );
  };

  renderDrinkMarkers = (drinks, index) => {
    if (drinks.length === 1) {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: drinks[0].Location._latitude,
            longitude: drinks[0].Location._longitude,
          }}
          title={
            typeof drinks[0].Price === 'number'
              ? `$${drinks[0].Price} ` + drinks[0].Name
              : `${drinks[0].Price} ` + drinks[0].Name
          }
          description={drinks[0].Venue}
          onCalloutPress={() => {
            this.setState({selectedVenueDrinks: null});
            this.props.navigation.navigate('DetailView', {
              docId: drinks[0].docId,
            });
          }}
        >
          <Icon
            name={this.getMarkerImage(drinks[0].Type)}
            type="FontAwesome5"
            style={{color: COLORS.red}}
          />
        </Marker>
      );
    } else {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: drinks[0].Location._latitude,
            longitude: drinks[0].Location._longitude,
          }}
          title={drinks[0].Venue}
          description={drinks.length + ' Drinks Available'}
          onCalloutPress={() => this.setState({selectedVenueDrinks: drinks})}
          trackViewChanges={false}
        >
          <View style={styles.circle}>
            <Text style={{color: COLORS.white}}>{drinks.length}</Text>
          </View>
        </Marker>
      );
    }
  };

  determineAvailability = (drinks, index) => {
    if (!this.state.onlyShowAvailable) {
      return this.renderDrinkMarkers(drinks, index);
    }

    let availableDrinks = [];
    _.forEach(drinks, (drink) => {
      if (currentAvailability(drink)) {
        availableDrinks.push(drink);
      }
    });
    if (availableDrinks.length === 0) {
      return;
    }
    return this.renderDrinkMarkers(availableDrinks, index);
  };

  toggleSwitch = () => {
    this.storeToggle(!this.state.onlyShowAvailable);
    this.setState({onlyShowAvailable: !this.state.onlyShowAvailable});
  };

  storeToggle = async (value) => {
    try {
      await AsyncStorage.setItem('@onlyShowAvailableDrinksToggle', value.toString());
    } catch (e) {
      console.tron.log('error storing toggle');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapView} initialRegion={this.state.region}>
          {this.props.currentLocation && this.currentLocationMarker()}
          {this.state.venues.map(({drinks}, index) => this.determineAvailability(drinks, index))}
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            // thumbColor={this.state.onlyShowAvailable ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.toggleSwitch()}
            value={this.state.onlyShowAvailable}
            style={{marginTop: 40, marginRight: 20, alignSelf: 'flex-end'}}
          />
        </MapView>
        {this.state.selectedVenueDrinks && (
          <ScrollView
            style={styles.scrollContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardContainer}>
              {_.map(this.state.selectedVenueDrinks, (drink) => (
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() =>
                    this.props.navigation.navigate('DetailView', {
                      docId: drink.docId,
                    })
                  }
                >
                  <DrinkSnippetCard drink={drink} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    zIndex: -1,
  },
  container: {
    flex: 1,
  },
  touchable: {
    paddingRight: 5,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    topDeals: state.drinks.allDrinks,
    currentLocation: state.location.currentLocation,
  };
};

export default connect(mapStateToProps)(DrinkMap);
