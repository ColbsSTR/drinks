import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DrinkCard from '../DrinkCard';
import COLORS from '../../assets/colors';

export const renderDrink = (drink, navigation) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailView', {docId: drink.docId});
      }}
      style={{backgroundColor: COLORS.backgroundWhite}}>
      <DrinkCard drink={drink} />
    </TouchableOpacity>
  );
};

// eslint-disable-next-line no-undef
export default Drinks = (props) => {
  const {selectedVenue} = props;
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={selectedVenue.Drinks}
        renderItem={({item}) => renderDrink(item, navigation)}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
};
