import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';
import COLORS from '../../assets/colors';

export const isDisabled = (filterType) => {
  const currentLocationAvailable = useSelector(
    (state) => state.location.currentLocation,
  );
  return !currentLocationAvailable && filterType === 'Distance';
};

export const FilterButton = ({filterType, handleFilterPress}) => (
  <Button
    disabled={isDisabled(filterType)}
    bordered
    style={styles.filterButton}
    onPress={() => handleFilterPress(filterType)}>
    <Text style={{color: COLORS.orange}}>By {filterType}</Text>
  </Button>
);

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: 'white',
    marginRight: 6,
    borderColor: COLORS.orange,
    borderWidth: 2,
  },
});
