import React from 'react';
import Stars from 'react-native-stars';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';

export const StarRating = ({value, size = 25}) => {
  return (
    <Stars
      display={value}
      spacing={25}
      count={5}
      starSize={size}
      fullStar={
        <Icon type="FontAwesome" name={'star'} style={[styles.myStarStyle]} />
      }
      emptyStar={
        <Icon
          type="FontAwesome"
          name={'star'}
          style={[styles.myEmptyStarStyle]}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
