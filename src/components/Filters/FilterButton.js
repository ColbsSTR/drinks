import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import COLORS from '../../assets/colors';

export const FilterButton = ({filterType, handleFilterPress}) => (
  <Button bordered style={ styles.filterButton } onPress={() => handleFilterPress(filterType) }>
    <Text style={{ color: COLORS.orange }}>By {filterType}</Text>
  </Button>
);

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: 'white',
    marginRight: 6, 
    borderColor: COLORS.orange, 
    borderWidth: 2
  },
});