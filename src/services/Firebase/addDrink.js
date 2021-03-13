import firestore from '@react-native-firebase/firestore';

export const addDrink = async (data) => {
  const { 
    Name, Price, Type, Category, Description, Latitude, Longitude, StartingTime, EndingTime, VenueName, Days
  } = data;
  try {
    await firestore().collection('Drinks').add({
      Name,
      Price,
      Type,
      Description,
      Location: new firestore.GeoPoint(Latitude, Longitude),
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
  }
  catch (err) {
    throw err;
  }
}