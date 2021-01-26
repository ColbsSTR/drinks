import firestore from '@react-native-firebase/firestore';

export const writeReviews = (data, user) => {
    const { docID, rating } = data;
    //**TODO**
    //Need to add a check for if there is already a document. If so, update, else add. This should never
    //happen because of how things are setup but if it does this needs to prevent one user having mult
    //reviews.
    firestore().collection('Drinks').doc(docID).collection('Reviews').add({
        Rating: rating,
        userID: user.user.uid,
    }).then((resp) => {
        return resp;
    }).catch((err) => {
        return new Error(`Firestore could not complete the request. Here's why: ${err}`);
    });
}