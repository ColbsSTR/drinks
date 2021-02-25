import firestore from '@react-native-firebase/firestore';

export const calculateAverage = (oldAverage, oldTotal, newRating) => {
  return (oldTotal*oldAverage + newRating)/(oldTotal+1);
}

export const writeNewRating = async ({ docID, currentRating, rating }) => {
  const { Average, Total } = currentRating;
  const newTotal = Total + 1;
  const newAverage = calculateAverage(Average, Total, rating);
  try {
    await firestore().collection('Drinks').doc(docID).update({
      Rating: {
        Average: newAverage,
        Total: newTotal,
      }
    });
    return {
      Average: newAverage,
      Total: newTotal,
    };
  } catch(err) {
    throw err;
  }
}
export const writeReviews = async (data, user) => {
  const { docID, rating } = data;
  //**TODO**
  //Need to add a check for if there is already a document. If so, update, else add. This should never
  //happen because of how things are setup but if it does this needs to prevent one user having mult
  //reviews.
  try {
    await firestore().collection('Drinks').doc(docID).collection('Reviews').add({
      Rating: rating,
      userID: user.uid,
    });
  } catch(err) {
    throw new Error(`Firestore could not complete the request. Here's why: ${err}`);
  }
}