import firestore from '@react-native-firebase/firestore';

export const getVenue = async (docId) => {
  let venueInfo;
  try {
    const snap = await firestore()
      .collection('Venues')
      .where('Drinks', 'array-contains', docId)
      .get();
    snap.forEach((doc) => {
      venueInfo = {...doc.data(), ...{docId: doc.id}};
    });
    return venueInfo;
  } catch (err) {
    return err;
  }
};
