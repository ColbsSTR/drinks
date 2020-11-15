import _ from 'lodash';

export default function filter(drinks, filters) {
    const { drinkType, drinkPrice, drinkDistance } = filters;
    let filteredDrinks = drinks;

    if (drinkType) {
        filteredDrinks = filterByTypeOfDrink(filteredDrinks, drinkType);
    }
    if (drinkPrice) {
        filteredDrinks = filterByPrice(filteredDrinks, drinkPrice);
    }
    if (drinkDistance) {
        filteredDrinks = filterByDistance(filteredDrinks, drinkDistance);
    }

    return filteredDrinks;
}

export function filterByTypeOfDrink (drinks, typeOfDrink) {
    if (typeOfDrink === 'ALL') {
        return drinks;
    }
    let filteredDrinks = [];
    _.forEach(drinks, drink => {
         if (drink.Type === typeOfDrink) {
            filteredDrinks.push(drink);
        }
    });
    return filteredDrinks;
}

export function filterByPrice(drinks, price) {
    if (price === 'ALL') {
        return drinks;
    }
    let filteredDrinks = [];
    _.forEach(drinks, drink => {
        if (drink.Price <= price) {
            filteredDrinks.push(drink);
        }
    });
    return filteredDrinks;
}

export function filterByDistance(drinks, distance) {
    if (distance === 'ALL') {
        return drinks;
    }
    let filteredDrinks = [];
    _.forEach(drinks, drink => {
        if (drink.Rating <= distance) { //***TODO*** add in distance to each drink
            filteredDrinks.push(drink);
        }
    });
    return filteredDrinks;
}