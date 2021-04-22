import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, StyleSheet, Platform, Image, Alert, ActivityIndicator} from 'react-native';
import {H2, H3, Button, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../assets/colors';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import {Marleys} from '../assets/images/index';
import {checkIn} from '../state/Actions/checkIn';
import {getLocation} from '../state/Selectors/getLocationState';
import {distanceBetweenCoordinates} from '../utilities/distanceBetweenCoordinates';
import {Spinner} from './Spinner';

export const VenueProfileHeader = (props) => {
  const {selectedVenue} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentLocation = useSelector(getLocation);
  const checkInWaiting = useSelector((state) => state.venues.isWaiting);

  const handleCheckIn = () => {
    if (currentLocation) {
      const {latitude, longitude} = currentLocation.coords;
      const {Location} = selectedVenue;
      const distanceFromVenue = distanceBetweenCoordinates(
        {latitude, longitude},
        {latitude: Location._latitude, longitude: Location._longitude},
      );
      distanceFromVenue >= 20
        ? Alert.alert('Sorry, move closer to the venue.')
        : dispatch(checkIn({docId: selectedVenue.docId, checkIns: selectedVenue.CheckInCount}));
    } else {
      Alert.alert('Sorry, Location Must Be Enabled To Check-In To A Venue.');
    }
  };

  return (
    <LinearGradient colors={[COLORS.orange, COLORS.lightOrange]} style={styles.container}>
      {!selectedVenue ? (
        <View style={styles.spinnerView}>
          <Spinner />
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" type="AntDesign" style={styles.arrow} />
            </Button>
            <Image style={styles.image} source={Marleys} resizeMode="contain" />
          </View>
          <View style={styles.nameContainer}>
            <H2 style={styles.name}>{selectedVenue.Name}</H2>
            <H3 style={styles.address}>{selectedVenue.Location}</H3>
          </View>
          <View style={styles.checkInContainer}>
            <Button block style={styles.checkInButton} success onPress={() => handleCheckIn()}>
              {checkInWaiting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.checkInText}>CHECK-IN-HERE</Text>
              )}
            </Button>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingBottom: 20,
  },
  imageContainer: {
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
  name: {
    fontWeight: '400',
    color: COLORS.backgroundWhite,
  },
  address: {
    fontWeight: '200',
    color: COLORS.backgroundWhite,
  },
  image: {
    width: 150,
    height: 75,
  },
  checkInContainer: {
    paddingBottom: 20,
  },
  checkInButton: {
    width: '70%',
    alignSelf: 'center',
  },
  checkInText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
