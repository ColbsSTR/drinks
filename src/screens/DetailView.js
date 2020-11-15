import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import MapView from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';
import {StarRating} from '../components/StarRating';
import {showModal} from '../state/Actions/modal';
import {getVenueInformation} from '../state/Actions/venueInformation';
import ReviewModal from '../components/ReviewModal';
import DrinkDetailCard from '../components/DrinkDetailCard';
import {connect} from 'react-redux';

class Detailview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { docId } = this.props.route.params.item;
    this.props.getVenueInformation(docId);
  }

  render() {
    const {item} = this.props.route.params;
    return (
      <ScrollView style={styles.container}>
        <DrinkDetailCard drink={item} />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={{paddingTop: 30}}>
          <StarRating value={5} size={40} />
          <TouchableOpacity onPress={() => this.props.showModal()}>
            <Text style={{textAlign: 'center', paddingTop: 20, color: 'blue'}}>
              Add a review
            </Text>
          </TouchableOpacity>
        </View>
        <ReviewModal docID={item.docId}/>
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
  },
  map: {
    flex: 1,
    aspectRatio: 2 / 1,
  },
});

const mapStateToProps = (state) => {
  return {
    topDeals: state.topDeals.deals,
    venue: state.venueInformation,
  };
};

const mapDispatchToProps = {
  getVenueInformation,
  showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detailview);
