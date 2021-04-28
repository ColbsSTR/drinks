import firestore from '@react-native-firebase/firestore';
import {getCoordsFromAddress} from '../../utilities/geocode';

export const addDrink = async (data) => {
  const {
    Name,
    Price,
    Type,
    Category,
    Description,
    Address,
    Venue,
    Availability,
    VenueDrinks,
  } = data;
  try {
    const coords = await getCoordsFromAddress(Address);
    const {VenueId, VenueName} = Venue;
    const {lat, lng} = coords.results[0].geometry.location;
    firestore()
      .collection('Drinks')
      .add({
        Name,
        Price: Number(Price),
        Type,
        Description,
        Location: new firestore.GeoPoint(lat, lng),
        Category,
        Availability,
        Rating: {
          Total: 0,
          Average: 0,
        },
        Venue: VenueName,
        VenueId,
      })
      .then(async (docRef) => {
        const UpdatedVenueDrinks = VenueDrinks.concat(docRef.id);
        await firestore().collection('Venues').doc(VenueId).update({
          Drinks: UpdatedVenueDrinks,
        });
      });
  } catch (err) {
    throw err;
  }
};
