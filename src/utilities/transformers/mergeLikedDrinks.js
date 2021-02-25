import _ from 'lodash';

export const mergeLikedDrinks = (allDrinks, likedDrinks) => {
    const modifiedDrinks = [];
    _.forEach(allDrinks, drink => {
        let modifiedDrink = { ...drink, liked: likedDrinks ? likedDrinks.includes(drink.docId) : false };
        modifiedDrinks.push(modifiedDrink);
    });
    return modifiedDrinks;
}