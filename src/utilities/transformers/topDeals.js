import _ from 'lodash';

export const partitionTopDeals = (allDrinks) => {
  const topDealsArray = [];
  _.forEach(allDrinks, drink => {
    drink.Category === 'TopDeal' && topDealsArray.push(drink);
  });
  return topDealsArray;
};