import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating} from 'react-native-elements';
import {showLocation} from 'react-native-map-link';
import LottieView from 'lottie-react-native';
import {showModal} from '../state/Actions/modal';
import ReviewModal from '../components/ReviewModal';
import DrinkDetailCard from '../components/DrinkDetailCard';
import {connect} from 'react-redux';
import {formatRating} from '../utilities/formatRating';
import COLORS from '../assets/colors';
import {GetRide} from '../components/GetRide';
import {present} from '../assets/animations';
import RedeemDealModal from '../components/RedeemDealModal';

class Detailview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrinkLive: false,
    };
  }

  componentDidMount() {
    const {docId} = this.props.route.params;
    const drink = this.getSelectedDrink(docId);
    if (drink.Exclusive) {
      this.animation.play();
    }
  }

  getDirections = () => {
    const {docId} = this.props.route.params;
    const drink = this.getSelectedDrink(docId);
    showLocation({
      latitude: drink.Location._latitude,
      longitude: drink.Location._longitude,
      title: drink.Venue,
      appsWhiteList: ['google-maps', 'apple-maps'],
    });
  };

  getSelectedDrink = (docId) => {
    const {drinks} = this.props;
    for (let i = 0; i < drinks.length; i++) {
      if (drinks[i].docId === docId) {
        return drinks[i];
      }
    }
  };

  render() {
    const {docId} = this.props.route.params;
    const drink = this.getSelectedDrink(docId);
    const rating = formatRating(drink.Rating.Average);

    return (
      <ScrollView style={styles.container}>
        <DrinkDetailCard drink={drink} docId={this.props.route.params.docId} />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: drink.Location._latitude,
            longitude: drink.Location._longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: drink.Location._latitude,
              longitude: drink.Location._longitude,
            }}
            title="Tap to get directions"
            onCalloutPress={() => this.getDirections()}
          />
        </MapView>
        <View style={drink.Exclusive ? styles.exclusiveDealContainer : styles.reviewsContainer}>
          {drink.Exclusive ? (
            <>
              <TouchableOpacity onPress={() => this.props.showModal()} style={styles.center}>
                <LottieView
                  source={present}
                  loop={false}
                  style={{width: 200, height: 200}}
                  ref={(animation) => {
                    this.animation = animation;
                  }}
                />
                <Text style={styles.reviewText}>Redeem Deal</Text>
              </TouchableOpacity>
              <RedeemDealModal drink={drink} />
            </>
          ) : (
            <>
              <Rating imageSize={30} readonly startingValue={rating} />
              <TouchableOpacity onPress={() => this.props.showModal()}>
                <Text style={styles.reviewText}>Add Review</Text>
              </TouchableOpacity>
              <GetRide />
              <ReviewModal docID={drink.docId} currentRating={drink.Rating} />
            </>
          )}
        </View>
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
    alignItems: 'center',
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
    paddingTop: 10,
    color: COLORS.blue,
  },
  exclusiveDealText: {
    color: COLORS.lightOrange,
  },
  exclusiveDealIcon: {
    color: COLORS.lightOrange,
    fontSize: 50,
  },
  exclusiveDealContainer: {
    paddingTop: 0,
    marginBottom: 30,
  },
  reviewsContainer: {
    paddingTop: 30,
    paddingBottom: 15,
  },
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
