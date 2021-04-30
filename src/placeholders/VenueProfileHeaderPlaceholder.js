import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Placeholder, PlaceholderLine, PlaceholderMedia, Shine} from 'rn-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../assets/colors';

export const VenueProfileHeaderPlaceholder = () => (
  <LinearGradient colors={[COLORS.orange, COLORS.lightOrange]} style={styles.container}>
    <View style={{paddingLeft: 110, marginTop: 80, paddingBottom: 20}}>
      <Placeholder>
        <PlaceholderMedia style={{width: 170, height: 80}} />
      </Placeholder>
    </View>
    <View style={{paddingLeft: 35, paddingBottom: 10}}>
      <Placeholder Animation={Shine}>
        <PlaceholderLine width={90} />
        <PlaceholderLine width={90} />
        <PlaceholderLine width={90} />
      </Placeholder>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
