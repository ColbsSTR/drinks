import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardItem,
  Text,
  Body,
  ListItem,
  Left,
  Right,
  Icon,
} from 'native-base';
import {StyleSheet} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import COLORS from '../assets/colors';
import { currentAvailability } from '../utilities/drinkAvailability';

export default DrinkDetailCard = (props) => {
  const drink = props.drink;
  const [isDrinkLive, setDrinkStatus] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    currentAvailability(drink) ? setDrinkStatus(true) : setDrinkStatus(false);
  }, [isFocused]);

  return (
    <Card style={styles.card1}>
      <CardItem header bordered style={styles.center}>
        <Text style={ styles.headerText }>{drink.Name}</Text>
      </CardItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: 'green'}}>
            <Icon type="FontAwesome" name="dollar" />
          </Button>
        </Left>
        <Body>
          <Text>Price</Text>
        </Body>
        <Right>
          <Text>{ typeof drink.Price === 'number' ? '$' + drink.Price : drink.Price}</Text>
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button>
            <Icon type="FontAwesome" name="location-arrow" />
          </Button>
        </Left>
        <Body>
          <Text>Venue</Text>
        </Body>
        <Right>
          <Text>{drink.Venue}</Text>
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: isDrinkLive ? COLORS.orange : COLORS.red}}>
            <Icon type="FontAwesome" name={isDrinkLive ? 'check' : 'times'} />
          </Button>
        </Left>
        <Body>
          <Text>{isDrinkLive ? 'Available Currently' : 'Not Available Currently' }</Text>
        </Body>
      </ListItem>
      <CardItem>
        <Body>
          <Text style={ styles.descriptionText }>{drink.Description}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  card1: {
    flex: 1,
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: COLORS.blue,
  },
  descriptionText: {
    color: COLORS.darkGrey,
  }
});
