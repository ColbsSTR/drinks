import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import COLORS from '../assets/colors';

export default SearchBar = ({handleSearch}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search By Drink Name"
        placeholderTextColor="gray"
        style={{flex: 1, padding: 0}}
        onChangeText={handleSearch}
      />
      <Icon name="search" style={{fontSize: 22, color: COLORS.mediumGrey}} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '95%',
    marginVertical: 10,
    backgroundColor: COLORS.backgroundWhite,
    borderRadius: 5,
    padding: 10,
    shadowRadius: 5,
    shadowColor: COLORS.darkGrey,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 1},
    elevation: 10,
  },
});
