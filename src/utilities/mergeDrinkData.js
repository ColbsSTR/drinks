import _ from 'lodash';

export const mergeDrinkData = (allDrinks, likedDrinks) => {
    const modifiedDrinks = [];
    _.forEach(allDrinks, drink => {
        drink['liked'] = likedDrinks ? likedDrinks.includes(drink.docId) : false;
        modifiedDrinks.push(drink);
    });
    return modifiedDrinks;
}