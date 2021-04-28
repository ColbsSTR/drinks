export const TransformVenueDrinks = ({venues, allDrinks}) => {
  let transformedVenues = [];

  venues.forEach((venue) => {
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
    transformedVenues.push(transformedObject);
  });
  return transformedVenues;
};
