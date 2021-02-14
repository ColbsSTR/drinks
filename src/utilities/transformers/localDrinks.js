import _ from 'lodash';

export const partitionLocalDrinks = (allDrinks) => {
  const localDrinksArray = [];
  _.forEach(allDrinks, drink => {
    drink.Local && localDrinksArray.push(drink);
  });
  return localDrinksArray;
};