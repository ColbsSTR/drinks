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
    StartingTime,
    EndingTime,
    VenueName,
    Days,
  } = data;
  try {
    const coords = await getCoordsFromAddress(Address);
    const {lat, lng} = coords.results[0].geometry.location;
    await firestore()
      .collection('Drinks')
      .add({
        Name,
        Price,
        Type,
        Description,
        Location: new firestore.GeoPoint(lat, lng),
        Category,
        Hours: {
          Beginning: StartingTime,
          End: EndingTime,
        },
        Rating: {
          Total: 0,
          Average: 0,
        },
        Venue: VenueName,
        Days,
      });
  } catch (err) {
    throw err;
  }
};
