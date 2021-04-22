import {
  GET_ALL_VENUES,
  GET_ALL_VENUES_START,
  GET_ALL_VENUES_SUCCEED,
  GET_ALL_VENUES_FAIL,
} from './actionTypes';

export const getAllVenues = () => {
  return {
    type: GET_ALL_VENUES,
  };
};

export const getAllVenuesStart = () => {
  return {
    type: GET_ALL_VENUES_START,
  };
};

export const getAllVenuesSucceed = (data) => {
  return {
    type: GET_ALL_VENUES_SUCCEED,
    payload: data,
  };
};

export const getAllVenuesFail = (data) => {
  return {
    type: GET_ALL_VENUES_FAIL,
    payload: data,
  };
};
