import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Drinks from '../components/VenueProfile/Drinks';
import COLORS from '../assets/colors';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import {getVenueInformation} from '../state/Actions/venueInformation';
import {VenueProfileHeader} from '../components/VenueProfileHeader';

const Tab = createMaterialTopTabNavigator();
const ProfileTabs = ({selectedVenue}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: COLORS.lightOrange},
        indicatorStyle: {backgroundColor: COLORS.black},
        labelStyle: {color: COLORS.white},
      }}>
      <Tab.Screen
        name="Drinks"
        options={{title: 'All Drinks'}}
        children={() => <Drinks selectedVenue={selectedVenue} />}
      />
    </Tab.Navigator>
  );
};

class VenueProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInitialized: false,
      selectedVenue: null,
    };
  }

  componentDidMount() {
    const {drink} = this.props.route.params;
    if (this.isVenueNull(drink.docId)) {
      this.props.getVenueInformation(drink.docId);
    } else {
      this.setSelectedVenue(drink.VenueId);
    }
  }

  componentDidUpdate(prevProps) {
    const {drink} = this.props.route.params;
    if (prevProps.venues !== this.props.venues) {
      this.setSelectedVenue(drink.VenueId);
    }
  }

  isVenueNull = (docId) => {
    const {venues} = this.props;
    let isNull = true;
    if (venues.length === 0) {
      return isNull;
    }
    venues.forEach((venue) => {
      if (venue.Drinks.some((drink) => drink.docId === docId)) {
        isNull = false;
        return isNull;
      }
    });
    return isNull;
  };

  setSelectedVenue = (selectedVenueId) => {
    const {venues} = this.props;
    venues.forEach((venue) => {
      if (venue.docId === selectedVenueId) {
        this.setState({selectedVenue: venue, dataInitialized: true});
        return;
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <VenueProfileHeader selectedVenue={this.state.selectedVenue} />
        <View style={styles.tabsContainer}>
          <ProfileTabs selectedVenue={this.state.selectedVenue} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? deviceHeight * 0.04 : deviceHeight * 0.03,
  },
  arrow: {
    color: 'black',
  },
  nameContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 15,
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    width: 150,
    height: 75,
  },
  tabsContainer: {
    flex: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    venues: state.venues.allVenues,
    isWaiting: state.venues.isWaiting,
  };
};

const mapDispatchToProps = {
  getVenueInformation,
};

export default connect(mapStateToProps, mapDispatchToProps)(VenueProfile);
