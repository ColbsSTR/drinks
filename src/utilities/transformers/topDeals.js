import _ from 'lodash';

export const partitionTopDeals = (allDrinks) => {
  const topDealsArray = [];
  _.forEach(allDrinks, drink => {
    drink.TopDeal && topDealsArray.push(drink);
  });
  return topDealsArray;
};