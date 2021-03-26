import {StyleSheet} from 'react-native';
import {Toast} from 'native-base';
import COLORS from '../assets/colors';

const getToastStyle = (type) => {
  return (drinks = {
    error: styles.error,
    success: styles.success,
    information: styles.information,
  }[type]);
};

export const showToast = (
  message,
  duration = 250,
  buttonText = 'Okay',
  type = 'information',
) => {
  Toast.show({
    text: message,
    buttonText,
    duration,
    position: 'bottom',
    textStyle: {textAlign: 'center'},
    style: getToastStyle(type),
  });
};

const styles = StyleSheet.create({
  error: {
    color: COLORS.red,
  },
  success: {
    backgroundColor: 'green',
  },
  information: {
    color: COLORS.orange,
  },
});
