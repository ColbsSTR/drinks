import haversine from 'haversine';

export const distanceBetweenCoordinates = (coord1, coord2) =>
  haversine(coord1, coord2, {unit: 'meter'});
