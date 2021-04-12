import {Linking, Alert} from 'react-native';

export const deepLink = async (url, errorMessage) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(errorMessage);
  }
};
