import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const createNewUser = async (user) => {
  try {
    const userDoc = await firestore().collection('Users').doc(user.uid).set({
      Email: user.email,
      LikedDrinks: [],
      Name: user.displayName,
    });
    return userDoc;
  } catch (err) {
    throw err;
  }
};

export const isNewUser = async (user) => {
  try {
    const userDoc = await firestore().collection('Users').doc(user.uid).get();

    if (!userDoc.data()) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error('Could not retrieve user information.');
  }
};

export const updateDisplayName = async ({name}) => {
  try {
    await auth().currentUser.updateProfile({
      displayName: name,
    });
    const updatedUser = await auth().currentUser;
    return updatedUser;
  } catch (err) {
    throw new Error('Could not update display name...');
  }
};
