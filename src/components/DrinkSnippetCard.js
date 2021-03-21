import React from 'react';
import {
  Card,
  CardItem,
  Left,
  Body,
  Icon,
} from 'native-base';
import { View, Text } from 'react-native';
import { getDrinkIcon, styles } from './DrinkCard';

export default DrinkSnippetCard = props => {
  const { drink } = props;
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
          <CardItem bordered style={styles.cardItem}>
            <Left>
              <Icon 
                name={getDrinkIcon(drink.Type)} 
                type='FontAwesome5' 
                style={styles.icon}
              />
              <Body>
                <Text style={styles.header}>
                  {drink.Name}
                </Text>
                <Text>{typeof drink.Price === 'number' ? '$' + drink.Price : drink.Price }</Text>
              </Body>
            </Left>
          </CardItem>
      </Card>
    </View>
  );
};