import firestore from '@react-native-firebase/firestore';

export const getTopDeals = async () => {
    const itemsArray = [];

    try {
        const snap = await firestore().collection('Drinks').where('TopDeal', '==', 'true').get();
        snap.forEach(doc => {
            itemsArray.push(doc.data());
        });
        return itemsArray;
    }
    catch (err) {
        return err;
    }
}