import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Icon, Text } from 'native-base';
import COLORS from '../assets/colors';

export default CustomRating = () => {
  const [rating, setRating] = useState(3);
  const numberOfIcons = [1,2,3,4,5];

  const getLabelText = () => {
    return { 
      1: 'Ghost Town',
      2: 'A few people',
      3: 'Kinda busy',
      4: 'Lotsa people',
      5: 'Everybodys here!',
    }[rating];
  };

  const RatingElement = ({ index }) => {
    return (
      <TouchableOpacity onPress={() => setRating(index)} style={styles.iconContainer}>
        <Icon
          style={index <= rating ? styles.filledIcon : styles.unfilledIcon}
          type="FontAwesome5" 
          name="fire"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{getLabelText()}</Text>
      <View style={styles.elementContainer}>
        { _.map(numberOfIcons, index => (
          <RatingElement index={index}/>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: COLORS.white,
  }, 
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 5,
  },
  labelText: {
    color: COLORS.lightGrey,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  }, 
  unfilledIcon: {
    fontSize: 25,
    color: COLORS.lightGrey,
  },
  filledIcon: {
    fontSize: 30,
    color: COLORS.red
  }
});
