import firestore from '@react-native-firebase/firestore';

export const setFeedback = async (data, user) => {
  const {Message, Rating, Type} = data;
  const {displayName, email} = user;
  const result = await firestore().collection('Feedback').add({
    DisplayName: displayName,
    Email: email,
    Message,
    Rating,
    Type,
    Date: new Date(),
  });
  return result;
};
