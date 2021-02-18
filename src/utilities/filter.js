import _ from 'lodash';
import haversine from 'haversine';

export default function filter(drinks, filters, currentLocation) {
  const { drinkType, drinkPrice, drinkDistance } = filters;
  let filteredDrinks = drinks;

  if (drinkType) {
      filteredDrinks = filterByTypeOfDrink(filteredDrinks, drinkType);
  }
  if (drinkPrice) {
      filteredDrinks = filterByPrice(filteredDrinks, drinkPrice);
  }
  if (drinkDistance) {
      filteredDrinks = filterByDistance(filteredDrinks, drinkDistance, currentLocation);
  }

  return filteredDrinks;
}

export function filterByTypeOfDrink (drinks, typeOfDrink) {
    if (typeOfDrink === 'All') {
        return drinks;
    }
    let filteredDrinks = [];
    _.forEach(drinks, drink => {
         if (drink.Type === typeOfDrink) {
            filteredDrinks.push(drink);
        }
    });
    return filteredDrinks;
}

export function filterByPrice(drinks, price) {
    if (price === 'All') {
        return drinks;
    }
    let filteredDrinks = [];
    _.forEach(drinks, drink => {
        if (drink.Price <= price) {
            filteredDrinks.push(drink);
        }
    });
    return filteredDrinks;
}

export function filterByDistance(drinks, distance, currentLocation) {
    if (distance === 'All') {
        return drinks;
    }
    let filteredDrinks = [];
    const start = { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude };
    _.forEach(drinks, drink => {
      let end = { latitude: drink.Location._latitude, longitude: drink.Location._longitude }
      const distanceToDrink = haversine(start, end, {unit: 'mile'});
      if (distanceToDrink <= distance) {
        filteredDrinks.push(drink);
      }
    });
    return filteredDrinks;
}