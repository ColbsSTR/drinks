import firestore from '@react-native-firebase/firestore';

export const checkInToVenue = async (props) => {
  const {selectedVenueDocId, checkIns, user} = props;
  let updatedUserCheckIns = [];
  if (user.CheckIns.length === 0) {
    updatedUserCheckIns.push({Count: 1, VenueId: selectedVenueDocId});
  } else {
    const venueExists = user.CheckIns.some(
      (checkInObj) => checkInObj.VenueId === selectedVenueDocId,
    );
    if (venueExists) {
      user.CheckIns.forEach((checkInObj) => {
        if (checkInObj.VenueId === selectedVenueDocId) {
          let updatedCheckInObj = {...checkInObj, Count: checkInObj.Count + 1};
          updatedUserCheckIns.push(updatedCheckInObj);
        } else {
          updatedUserCheckIns.push(checkInObj);
        }
      });
    } else {
      updatedUserCheckIns = [...user.CheckIns, {Count: 1, VenueId: selectedVenueDocId}];
    }
  }
  try {
    await firestore()
      .collection('Venues')
      .doc(selectedVenueDocId)
      .update({CheckInCount: checkIns ? checkIns + 1 : 1});
    await firestore().collection('Users').doc(user.uid).update({
      CheckIns: updatedUserCheckIns,
    });
  } catch (err) {
    throw err;
  }
};
