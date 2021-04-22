import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DrinkCard from '../DrinkCard';
import COLORS from '../../assets/colors';
import {DrinkCardPlaceholder} from '../../placeholders/DrinkCardPlaceholder';

export const renderDrink = (drink, navigation) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailView', {drink: drink});
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
      {selectedVenue ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={selectedVenue.Drinks}
          renderItem={({item}) => renderDrink(item, navigation)}
          keyExtractor={(item) => item.docId}
        />
      ) : (
        <FlatList data={[1, 2, 3]} renderItem={() => <DrinkCardPlaceholder />} />
      )}
    </View>
  );
};
