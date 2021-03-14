import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import _ from 'lodash';
import MapView, { Marker } from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';
import { Rating } from "react-native-elements";
import { showLocation } from 'react-native-map-link'
import {showModal} from '../state/Actions/modal';
import ReviewModal from '../components/ReviewModal';
import DrinkDetailCard from '../components/DrinkDetailCard';
import {connect} from 'react-redux';
import { formatRating } from '../utilities/formatRating';
import COLORS from '../assets/colors';

class Detailview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrinkLive: false,
    }
  }

  getDirections = () => {
    const { docId } = this.props.route.params;
    const drink = this.getSelectedDrink(docId);
    showLocation({
      latitude: drink.Location._latitude,
      longitude: drink.Location._longitude,
      title: drink.Venue,
      appsWhiteList: ['google-maps', 'apple-maps'],
    });
  }

  getSelectedDrink = docId => {
    const { drinks } = this.props;
    for(let i = 0; i < drinks.length; i++) {
      if(drinks[i].docId === docId) {
        return drinks[i];
      }
    }
  }

  render() {
    const { docId } = this.props.route.params;
    const drink = this.getSelectedDrink(docId);
    const rating = formatRating(drink.Rating.Average);
  
    return (
      <ScrollView style={styles.container}>
        <DrinkDetailCard drink={drink} />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: drink.Location._latitude,
            longitude: drink.Location._longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{ latitude: drink.Location._latitude, longitude: drink.Location._longitude}}
            title='Tap to get directions'
            onCalloutPress={() => this.getDirections()}
          />
        </MapView>
        <View style={{paddingTop: 30}}>
          <Rating 
            imageSize={30} 
            readonly 
            startingValue={rating} 
          />
          <TouchableOpacity onPress={() => this.props.showModal()}>
            <Text style={ styles.reviewText}>
              Add a review
            </Text>
          </TouchableOpacity>
        </View>
        <ReviewModal docID={drink.docId} currentRating={drink.Rating}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card1: {
    flex: 1,
  },
  card2: {
    flex: 1,
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: COLORS.white,
    paddingBottom: 10,
  },
  map: {
    flex: 1,
    aspectRatio: 2 / 1,
  },
  reviewText: {
    textAlign: 'center', 
    paddingTop: 20, 
    color: COLORS.blue,
  }
});

const mapStateToProps = (state) => {
  return {
    drinks: state.drinks.allDrinks,
  };
};

const mapDispatchToProps = {
  showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detailview);
