import {currentAvailability} from './drinkAvailability';

export const sortDrinksByAvailability = (allDrinks) => {
  const sortedDrinks = [...allDrinks];
  return sortedDrinks.sort((drink1, drink2) => {
    return currentAvailability(drink2) - currentAvailability(drink1);
  });
};

export const sortDrinksByPriceAscending = (allDrinks) => {
  const sortedDrinks = [...allDrinks];
  return sortedDrinks.sort((drink1, drink2) => {
    if (typeof drink1.Price === 'string' || typeof drink2.Price === 'string') {
      return true;
    }
    return drink1.Price - drink2.Price;
  });
};
