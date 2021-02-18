import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';

export default isLocationAvailable = async () => {
  let access = '';
  if (Platform.OS === 'ios') {
    access = await Geolocation.requestAuthorization('whenInUse');
    return access === 'granted' ? true : false;
  } else {
    access = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
          'title': 'DrinksApp Location Permission',
          'message': 'Drinks App needs access to your location to find the best drinks deals around you'
      }
    );
    return access;
  }
}