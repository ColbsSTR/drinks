import {SET_LOCATION} from './actionTypes';

export const setCurrentLocation = (payload) => {
  return {
    type: SET_LOCATION,
    payload,
  };
};
