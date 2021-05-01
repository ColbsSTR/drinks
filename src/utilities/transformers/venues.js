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

export const updateCheckInCount = ({allVenues, venueId}) => {
  const updatedVenues = [];
  allVenues.forEach((venue) => {
    if (venue.venueId === venueId) {
      const modifiedVenue = {
        ...venue,
        CheckInCount: venue.CheckInCount ? venue.CheckInCount + 1 : 1,
      };
      updatedVenues.push(modifiedVenue);
    } else {
      updatedVenues.push({...venue});
    }
  });
  return updatedVenues;
};
