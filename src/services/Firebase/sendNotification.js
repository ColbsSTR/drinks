import firestore from '@react-native-firebase/firestore';

export const sendNotification = async (data) => {
  console.log('sending notif');
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
