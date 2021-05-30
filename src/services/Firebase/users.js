import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const createNewUser = async (user) => {
  const userDoc = await firestore().collection('Users').doc(user.uid).set({
    Email: user.email,
    LikedDrinks: [],
    Name: user.displayName,
    CheckIns: [],
  });
  return userDoc;
};

export const isNewUser = async (user) => {
  const userData = await getUserData(user);

  if (!userData) {
    return true;
  }
  return false;
};

export const updateDisplayName = async ({name}) => {
  await auth().currentUser.updateProfile({
    displayName: name,
  });
};

export const getFirestoreUserData = async (user) => {
  const userDoc = await firestore().collection('Users').doc(user.uid).get();
  return userDoc.data();
};

export const getAuthData = async () => {
  const authData = await auth().currentUser;
  return authData;
};
