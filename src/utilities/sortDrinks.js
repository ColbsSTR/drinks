import {currentAvailability} from './drinkAvailability';

export const sortDrinksByAvailability = (allDrinks) => {
  const sortedDrinks = [...allDrinks];
  return sortedDrinks.sort((drink1, drink2) => {
    return currentAvailability(drink2) - currentAvailability(drink1);
  });
};

export const sortDrinksByPriceAscending = (allDrinks) => {
  //create a new array without the prices that are percents & store them in a seperate array
  const allDrinksWithoutPercentPrices = [...allDrinks];
  const drinksWithPercentPrices = [];
  for (let i = 0; i < allDrinks.length; i++) {
    if (typeof allDrinks[i].Price === 'string') {
      const indexToRemove = allDrinksWithoutPercentPrices.indexOf(allDrinks[i]);
      drinksWithPercentPrices.push(i);
      allDrinksWithoutPercentPrices.splice(indexToRemove, 1);
    }
  }

  //sort the new array by price
  const sortedDrinks = [...allDrinksWithoutPercentPrices];
  sortedDrinks.sort((drink1, drink2) => {
    return drink1.Price - drink2.Price;
  });

  //add the percent prices array to the end of the sorted array
  if (drinksWithPercentPrices.length > 0) {
    const sortedDrinksWithPercentsAtEnd = [...sortedDrinks];
    drinksWithPercentPrices.forEach((index) => {
      sortedDrinksWithPercentsAtEnd.push(allDrinks[index]);
    });
    return sortedDrinksWithPercentsAtEnd;
  }
  return sortedDrinks;
};
