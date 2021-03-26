import firestore from '@react-native-firebase/firestore';

export const getAllDrinks = async () => {
  const itemsArray = [];

  try {
    const snap = await firestore().collection('Drinks').get();
    snap.forEach((doc) => {
      const drink = {...doc.data(), ...{docId: doc.id}};
      itemsArray.push(drink);
    });
    return itemsArray;
  } catch (err) {
    throw err;
  }
};
