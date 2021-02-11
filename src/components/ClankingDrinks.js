import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { drinksClanking } from '../assets/animations/index';

export default ClankingDrinks = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView 
        source={ drinksClanking }
        loop
        autoPlay
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
}