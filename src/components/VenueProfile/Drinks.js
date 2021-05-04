import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DrinkCard from '../DrinkCard';
import COLORS from '../../assets/colors';
import {DrinkCardPlaceholder} from '../../placeholders/DrinkCardPlaceholder';
import {getDrinks} from '../../state/Selectors/getDrinksState';

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

export const getVenueDrinks = (selectedVenue, allDrinks) => {
  const venueDrinks = [];
  allDrinks.forEach((drink) => {
    const {docId} = drink;
    if (selectedVenue.Drinks.includes(docId)) {
      venueDrinks.push(drink);
    }
  });
  return venueDrinks;
};

// eslint-disable-next-line no-undef
export default Drinks = (props) => {
  const {selectedVenue} = props;
  const navigation = useNavigation();
  const allDrinks = useSelector(getDrinks);
  const venueDrinks = selectedVenue ? getVenueDrinks(selectedVenue, allDrinks) : [];
  return (
    <View>
      {selectedVenue ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={venueDrinks}
          renderItem={({item}) => renderDrink(item, navigation)}
          keyExtractor={(item) => item.docId}
        />
      ) : (
        <FlatList data={[1, 2, 3]} renderItem={() => <DrinkCardPlaceholder />} />
      )}
    </View>
  );
};
