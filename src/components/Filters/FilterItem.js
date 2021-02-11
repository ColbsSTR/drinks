import React from 'react';
import { Text , ListItem, Radio, Right, Left } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const FilterItem = ({filterValue, handleFilterItemPress, selected}) => (
  <TouchableOpacity onPress={() => handleFilterItemPress(filterValue)}>
    <ListItem>
      <Left>
        <Text>{filterValue.text}</Text>
      </Left>
      <Right>
        <Radio selected={selected} />
      </Right>
    </ListItem>
  </TouchableOpacity>
);