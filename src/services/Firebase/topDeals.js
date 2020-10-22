import firestore from '@react-native-firebase/firestore';

export const getTopDeals = async () => {
    const itemsArray = [];

    try {
        const snap = await firestore().collection('Drinks').where('TopDeal', '==', 'true').get();
        snap.forEach(doc => {
            const deal = {...doc.data(), ...{ docId: doc.id} }
            itemsArray.push(deal);
        });
        return itemsArray;
    }
    catch (err) {
        return err;
    }
}