import React from 'react';
import {Card, CardItem, Left, Body, Icon} from 'native-base';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {getDrinkIcon} from './DrinkCard';
import COLORS from '../assets/colors';

// eslint-disable-next-line no-undef
export default DrinkSnippetCard = (props) => {
  const {drink} = props;
  return (
    <View style={styles.container}>
      <Card style={props.large ? styles.largeCard : styles.card}>
        <CardItem bordered style={styles.cardItem}>
          <Left>
            <Icon
              name={getDrinkIcon(drink.Type)}
              type="FontAwesome5"
              style={styles.icon}
            />
            <Body>
              <Text style={styles.header}>{drink.Name}</Text>
              <Text>
                {typeof drink.Price === 'number'
                  ? '$' + drink.Price
                  : drink.Price}
              </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 1},
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width / 1.5,
  },
  largeCard: {
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 1},
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width - 20,
  },
  cardItem: {
    borderRadius: 6,
    height: 80,
  },
  icon: {
    color: COLORS.orange,
  },
});
