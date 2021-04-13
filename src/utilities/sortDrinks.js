import {currentAvailability} from './drinkAvailability';

export const SortDrinksByAvailability = (allDrinks) => {
  const updatedDrinks = [...allDrinks];
  return updatedDrinks.sort((drink1, drink2) => {
    return currentAvailability(drink2) - currentAvailability(drink1);
  });
};
