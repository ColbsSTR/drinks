import AsyncStorage from '@react-native-async-storage/async-storage';

export const getValue = async (key) => {
  const value = await AsyncStorage.getItem('@' + key);
  if (value !== null) {
    return value === 'true';
  }
};
//onlyShowAvailableDrinksToggle
export const setValue = async ({key, data}) => {
  await AsyncStorage.setItem('@' + key, data.toString());
};
