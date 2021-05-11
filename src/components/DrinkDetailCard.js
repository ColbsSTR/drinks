import React, {useState, useEffect} from 'react';
import {Button, Card, CardItem, Text, Body, ListItem, Left, Right, Icon} from 'native-base';
import {StyleSheet, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import COLORS from '../assets/colors';
import {currentAvailability} from '../utilities/drinkAvailability';
import {militaryToStandard} from '../utilities/time';
import {buildShareLink} from '../state/Actions/buildShareLink';
import {TouchableOpacity} from 'react-native';
import { sendAnalytic } from '../services/Firebase/sendAnalytic';

export const DrinksHours = ({drink}) => {
  return drink.Availability.map((day) => {
    const standardTimeBegin = militaryToStandard(day.Times[0]);
    const standardTimeEnd = militaryToStandard(day.Times[1]);
    return (
      <ListItem>
        <Text style={{fontSize: 14}}>{day.Day}</Text>
        <View style={{marginLeft: 12}}>
          <Text style={{fontSize: 14}}>{standardTimeBegin + ' - ' + standardTimeEnd}</Text>
        </View>
      </ListItem>
    );
  });
};

export default DrinkDetailCard = (props) => {
  const drink = props.drink;
  const [isDrinkLive, setDrinkStatus] = useState(false);
  const [hoursShown, setHoursShown] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    currentAvailability(drink) ? setDrinkStatus(true) : setDrinkStatus(false);
  }, [isFocused]);

  const navToVenueProfile = () => {
    sendAnalytic('nav_to_venue_profile', {venueName: drink.Venue});
    navigation.navigate('VenueProfile', {drink: drink});
  };

  return (
    <Card style={styles.card1}>
      <CardItem header bordered style={styles.center}>
        <View style={styles.header}>
          <View style={{flex: 1}} />
          <Text style={styles.headerText}>{drink.Name}</Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => dispatch(buildShareLink(props.docId))}>
            <Icon
              type="Ionicons"
              name="share-outline"
              style={{alignSelf: 'flex-end', color: COLORS.blue}}
            />
          </TouchableOpacity>
        </View>
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
          <Text>{typeof drink.Price === 'number' ? '$' + drink.Price : drink.Price}</Text>
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
          <Text style={{color: COLORS.blue, fontSize: 15}} onPress={() => navToVenueProfile()}>
            {drink.Venue}
          </Text>
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{backgroundColor: isDrinkLive ? COLORS.orange : COLORS.red}}>
            <Icon type="FontAwesome" name={isDrinkLive ? 'check' : 'times'} />
          </Button>
        </Left>
        <Body>
          <Text>{isDrinkLive ? 'Available Currently' : 'Not Available Currently'}</Text>
        </Body>
        <Right>
          <Text
            style={{color: COLORS.blue, fontSize: 14}}
            onPress={() => setHoursShown(!hoursShown)}>
            {hoursShown ? 'Hide Hours' : 'Show Hours'}
          </Text>
        </Right>
      </ListItem>
      {hoursShown && drink.Availability && <DrinksHours drink={drink} />}
      <CardItem>
        <Body>
          <Text style={styles.descriptionText}>{drink.Description}</Text>
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
  header: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerText: {
    color: COLORS.orange,
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 3,
  },
  shareButton: {
    flex: 1,
  },
  descriptionText: {
    color: COLORS.darkGrey,
  },
});
