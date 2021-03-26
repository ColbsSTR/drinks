import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import COLORS from '../../assets/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ActiveFilterButton = ({filterValue, onPress}) => (
  <Button bordered style={styles.filterButton}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="x" type="Feather" style={styles.icon} />
    </TouchableOpacity>
    <Text style={styles.text}>{filterValue}</Text>
  </Button>
);

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: COLORS.orange,
    marginRight: 6,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  icon: {
    marginRight: 4,
    marginLeft: 8,
    color: COLORS.white,
  },
  text: {
    color: COLORS.white,
    paddingLeft: 0,
    paddingRight: 8,
  },
});
