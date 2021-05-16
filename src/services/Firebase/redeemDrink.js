import firestore from '@react-native-firebase/firestore';

export const redeemDrink = async (drink, user) => {
  const updatedRedeemedDrinks = {...user.RedeemedDrinks, [drink.docId]: Date.now()};
  await firestore().collection('Users').doc(user.uid).update({
    RedeemedDrinks: updatedRedeemedDrinks,
  });
};
