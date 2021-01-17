import _ from 'lodash';

export const mergeDrinkData = (topDeals, likedDrinks) => {
    const modifiedDeals = [];
    _.forEach(topDeals, drink => {
        drink['liked'] = likedDrinks ? likedDrinks.includes(drink.docId) : false;
        modifiedDeals.push(drink);
    });
    return modifiedDeals;
}