import React from 'react';
import {
  Card,
  CardItem,
  Left,
  Body,
  Icon,
} from 'native-base';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import COLORS from '../assets/colors';

export default DrinkCard = (props) => {
	const { drink } = props; 
  return (
    <View style={styles.container}>
        <Card style={styles.card}>
            <CardItem bordered style={styles.cardItem}>
              <Left>
                <Icon name='wine-outline' />
                <Body>
                  <Text style={styles.text}>
                    {drink.Name}
                  </Text>
                  <Text>${drink.Price}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={ styles.cardItem }>
              <Body>
                <Text numberOfLines={3} style={ styles.text }>
                  {drink.Description}
                </Text>
              </Body>
            </CardItem>
        </Card>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
		alignItems: 'center',
  },
  card: {
    shadowRadius: 3, 
    shadowOpacity: .3, 
    shadowOffset:{ width: 0, height: 3 },
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: Dimensions.get('window').width - 20,
  },
  cardItem: {
		borderRadius: 6,
		height: 80
  },
  text: {
    color: COLORS.darkGrey,
    paddingBottom: 5,
  }
});
