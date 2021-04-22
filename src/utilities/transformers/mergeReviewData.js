import _ from 'lodash';

export const mergeReviewData = (props) => {
  const {docID, rating, allDrinks} = props;
  const newDrinks = [];
  _.forEach(allDrinks, (drink) => {
    if (drink.docId === docID) {
      let newDrink = {...drink, Rating: rating};
      newDrinks.push(newDrink);
    } else {
      newDrinks.push(drink);
    }
  });
  return newDrinks;
};
