import _ from 'lodash';

export const partitionSpecialtyDrinks = (allDrinks) => {
  const specialtyDrinksArray = [];
  _.forEach(allDrinks, drink => {
    drink.Category === 'Specialty' && specialtyDrinksArray.push(drink);
  });
  return specialtyDrinksArray;
};