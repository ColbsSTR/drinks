import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Platform, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {H2, H3, Button, Icon} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Drinks from '../components/VenueProfile/Drinks';
import COLORS from '../assets/colors';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import {getVenueInformation} from '../state/Actions/venueInformation';
import {Marleys} from '../assets/images/index';

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
      selectedVenue: {},
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
        <LinearGradient
          colors={[COLORS.orange, COLORS.lightOrange]}
          style={{flex: 4, paddingBottom: 20}}>
          <View style={styles.avatarContainer}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrowleft" type="AntDesign" style={styles.arrow} />
            </Button>
            <Image style={styles.image} source={Marleys} resizeMode="contain" />
          </View>
          <View style={styles.nameContainer}>
            <H2 style={{fontWeight: '400', color: COLORS.backgroundWhite}}>
              {this.state.selectedVenue.Name}
            </H2>
            <H3 style={{fontWeight: '200', color: COLORS.backgroundWhite}}>
              519 W Dickson St, Fayetteville
            </H3>
          </View>
        </LinearGradient>
        <View style={{flex: 10}}>
          {this.state.dataInitialized && (
            <ProfileTabs selectedVenue={this.state.selectedVenue} />
          )}
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
    paddingTop:
      Platform.OS === 'ios' ? deviceHeight * 0.04 : deviceHeight * 0.03,
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
