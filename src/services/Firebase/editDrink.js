import firestore from '@react-native-firebase/firestore';

export const editDrink = async (data) => {
  const {Name, Price, Description, Availability, docId} = data;
  try {
    await firestore()
      .collection('Drinks')
      .doc(docId)
      .update({
        Name,
        Price: Number(Price),
        Description,
        Availability,
      });
  } catch (err) {
    throw err;
  }
};
