export const TransformVenueDrinks = ({venue, allDrinks}) => {
  const {Drinks} = venue;
  const updatedDrinks = [];
  allDrinks.forEach((drink) => {
    const {docId} = drink;
    if (Drinks.includes(docId)) {
      updatedDrinks.push(drink);
    }
  });
  const transformedObject = {
    ...venue,
    Drinks: updatedDrinks,
  };
  return transformedObject;
};
