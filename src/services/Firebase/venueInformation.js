import firestore from '@react-native-firebase/firestore';

export const getVenue = async (docId) => {
    try {
        const docRef = await firestore().collection('Drinks').doc(docId);
        const snap = await firestore().collection('Venues').where('Drinks', 'array-contains', docRef).get();
        snap.forEach(doc => {
            console.log(doc);
        });
    } catch (err) {
        console.log('error occured', err);
    }
}