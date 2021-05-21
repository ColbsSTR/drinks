import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Drinks from '../components/VenueProfile/Drinks';
import COLORS from '../assets/colors';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import {getAllVenues} from '../state/Actions/getAllVenues';
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
    const {venues} = this.props;
    if (venues.length === 0) {
      this.props.getAllVenues();
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

  setSelectedVenue = (selectedVenueId) => {
    const {venues} = this.props;
    venues.forEach((venue) => {
      if (venue.venueId === selectedVenueId) {
        this.setState({selectedVenue: venue, dataInitialized: true});
        return;
      }
    });
  };

  render() {
    const {drink} = this.props.route.params;
    return (
      <View style={styles.container}>
        <VenueProfileHeader selectedVenue={this.state.selectedVenue} drink={drink} />
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
    flex: 3,
  },
});

const mapStateToProps = (state) => {
  return {
    venues: state.venues.allVenues,
    allDrinks: state.drinks.allDrinks,
    isWaiting: state.venues.isWaiting,
  };
};

const mapDispatchToProps = {
  getAllVenues,
};

export default connect(mapStateToProps, mapDispatchToProps)(VenueProfile);
