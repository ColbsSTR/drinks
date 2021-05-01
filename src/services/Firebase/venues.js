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

export const getVenues = async () => {
  const venuesArray = [];

  const snap = await firestore().collection('Venues').get();
  snap.forEach((doc) => {
    const venue = {...doc.data(), ...{venueId: doc.id}};
    venuesArray.push(venue);
  });
  return venuesArray;
};

export const checkInToVenue = async (props) => {
  const {selectedVenueId, checkIns, user} = props;
  let updatedUserCheckIns = [];
  if (user.CheckIns.length === 0) {
    updatedUserCheckIns.push({Count: 1, VenueId: selectedVenueId});
  } else {
    const venueExists = user.CheckIns.some((checkInObj) => checkInObj.VenueId === selectedVenueId);
    if (venueExists) {
      user.CheckIns.forEach((checkInObj) => {
        if (checkInObj.VenueId === selectedVenueId) {
          let updatedCheckInObj = {...checkInObj, Count: checkInObj.Count + 1};
          updatedUserCheckIns.push(updatedCheckInObj);
        } else {
          updatedUserCheckIns.push(checkInObj);
        }
      });
    } else {
      updatedUserCheckIns = [...user.CheckIns, {Count: 1, VenueId: selectedVenueId}];
    }
  }
  try {
    await firestore()
      .collection('Venues')
      .doc(selectedVenueId)
      .update({CheckInCount: checkIns + 1});
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        CheckIns: updatedUserCheckIns,
        TotalCheckInCount: user.TotalCheckInCount ? user.TotalCheckInCount + 1 : 1,
      });
  } catch (err) {
    throw err;
  }
};
