import Geocoder from 'react-native-geocoding';

export const getCoordsFromAddress = async (address) => {
  Geocoder.init('AIzaSyC5f0ZMMaX0ZaDGt7iCq2Zl2y4i3RHLMxk');
  try {
    const coords = await Geocoder.from(address);
    return coords;
  } catch(err) {
    throw err;
  }
}