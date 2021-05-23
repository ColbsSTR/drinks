import messaging from '@react-native-firebase/messaging';

export default requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const topic = 'main'; // main for prod

  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log('Subscribed to topic', topic));

  return enabled;
};
