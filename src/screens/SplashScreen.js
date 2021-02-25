import React, { Component } from 'react';
import { View } from 'react-native';
import ClankingDrinks from '../components/ClankingDrinks';
import COLORS from '../assets/colors';

class SplashScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.orange, justifyContent: 'center', alignItems: 'center' }}>
        <ClankingDrinks />
      </View>
    );
  }
}

export default SplashScreen;
