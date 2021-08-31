import React, {useRef, useEffect, useState} from 'react';
import {Card, CardItem, Left, Body, Icon} from 'native-base';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import COLORS from '../assets/colors';
import {heart, giftBox} from '../assets/animations/index';
import {currentAvailability} from '../utilities/drinkAvailability';

export const getDrinkIcon = (type) => {
  return (drinks = {
    Beer: 'beer',
    Cocktail: 'cocktail',
    Wine: 'wine-glass',
    Margarita: 'cocktail',
  }[type]);
};

export default DrinkCard = (props) => {
  const {drink, onHeartPress} = props;
  const LottieRef = useRef(null);
  const isFocused = useIsFocused();
  const [drinkAvailable, setDrinkAvailability] = useState(false);

  useEffect(() => {
    currentAvailability(drink) ? setDrinkAvailability(true) : setDrinkAvailability(false);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Card style={drink.Exclusive ? [styles.card, styles.exclusiveCard] : styles.card}>
        <CardItem bordered style={styles.cardItem}>
          <Left>
            <Icon name={getDrinkIcon(drink.Type)} type="FontAwesome5" style={styles.icon} />
            <Body>
              <View style={styles.rowView}>
                <Text style={styles.header}>{drink.Name}</Text>
                <Text> - </Text>
                <Text>
                  {typeof drink.Price === 'number' ? '$' + drink.Price : drink.Price + ' Off'}
                </Text>
              </View>
              <Text style={styles.venueName}>{drink.Venue}</Text>
              {drinkAvailable && <Text style={styles.availableText}>Available</Text>}
            </Body>
          </Left>
          {drink.Exclusive ? (
            <LottieView
              source={giftBox}
              loop={true}
              autoPlay
              ref={LottieRef}
              style={{width: 40, height: 40}}
            />
          ) : (
            onHeartPress && (
              <TouchableOpacity
                onPress={() => {
                  onHeartPress(drink, LottieRef);
                }}>
                <LottieView
                  source={heart}
                  loop={false}
                  ref={LottieRef}
                  progress={drink.liked ? 0.4 : 0}
                  style={{width: 50, height: 50}}
                />
              </TouchableOpacity>
            )
          )}
        </CardItem>
        <CardItem style={{borderRadius: 6}}>
          <Body>
            <Text numberOfLines={3} style={styles.body}>
              {drink.Description}
            </Text>
          </Body>
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
    width: Dimensions.get('window').width - 20,
  },
  exclusiveCard: {
    borderWidth: 5,
    borderColor: COLORS.orange,
  },
  cardItem: {
    borderRadius: 6,
    height: 70,
  },
  header: {
    color: COLORS.darkGrey,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  body: {
    color: COLORS.mediumGrey,
  },
  icon: {
    color: COLORS.orange,
  },
  availableText: {
    color: 'green',
    fontSize: 12,
  },
  rowView: {
    flexDirection: 'row',
  },
  venueName: {
    fontSize: 12,
    paddingBottom: 3,
  },
});
