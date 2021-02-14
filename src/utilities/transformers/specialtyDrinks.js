import _ from 'lodash';

export const partitionSpecialtyDrinks = (allDrinks) => {
  const specialtyDrinksArray = [];
  _.forEach(allDrinks, drink => {
    drink.Specialty && specialtyDrinksArray.push(drink);
  });
  return specialtyDrinksArray;
};