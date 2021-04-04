import {Platform, Share} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const buildShareLink = async (docId) => {
  try {
    const link = await dynamicLinks().buildLink({
      link: 'https://mydrinksapp.com/shareDrink?drinkId=' + docId,
      domainUriPrefix: 'https://mydrinksapp.page.link',
    });
    return link;
  } catch (err) {
    throw err;
  }
};

export const onShare = async (link) => {
  try {
    if (Platform.OS === 'ios') {
      const result = await Share.share({
        url: link,
      });
    } else {
      const result = await Share.share({
        message: link,
      });
    }
  } catch (error) {
    alert(error.message);
  }
};
