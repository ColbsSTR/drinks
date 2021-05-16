import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import COLORS from '../assets/colors';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import {deepLink} from '../utilities/DeepLink';

export const openUber = async () => {
  const uberURL = 'https://m.uber.com/ul/?client_id=<CLIENT_ID>';
  await deepLink(uberURL, 'Sorry we are unable to open Uber at this time.');
};

export const GetRide = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openUber()}>
        <Text style={styles.text}>Need A Ride?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: deviceHeight * 0.05,
    paddingTop: 10,
  },
  text: {
    color: COLORS.blue,
  },
});
