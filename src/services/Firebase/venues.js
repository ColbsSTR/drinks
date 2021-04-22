import firestore from '@react-native-firebase/firestore';

export const getVenue = async (docId) => {
  let venueInfo;
  try {
    const docRef = await firestore().collection('Drinks').doc(docId);
    const snap = await firestore()
      .collection('Venues')
      .where('Drinks', 'array-contains', docRef)
      .get();
    snap.forEach((doc) => {
      venueInfo = doc.data();
    });
    return venueInfo;
  } catch (err) {
    return err;
  }
};

export const getVenues = async () => {
  const venuesArray = [];

  const snap = await firestore().collection('Venues').get();
  snap.forEach((doc) => {
    const venue = {...doc.data(), ...{venueId: doc.id}};
    venuesArray.push(venue);
  });
  return venuesArray;
};
