import firestore from '@react-native-firebase/firestore';

export const sendNotification = async (data) => {
  const {Header, Body} = data;
  try {
    await firestore().collection('Notifications').add({
      Header,
      Body,
    });
  } catch (err) {
    throw err;
  }
};
