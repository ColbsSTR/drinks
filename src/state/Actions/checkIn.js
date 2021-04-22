import {
  CHECK_IN_TO_VENUE,
  CHECK_IN_TO_VENUE_START,
  CHECK_IN_TO_VENUE_SUCCEED,
  CHECK_IN_TO_VENUE_FAIL,
} from './actionTypes';

export const checkIn = (data) => {
  return {
    type: CHECK_IN_TO_VENUE,
    payload: data,
  };
};

export const checkInStart = (data) => {
  return {
    type: CHECK_IN_TO_VENUE_START,
    payload: data,
  };
};

export const checkInSucceed = (data) => {
  return {
    type: CHECK_IN_TO_VENUE_SUCCEED,
    payload: data,
  };
};

export const checkInFail = (data) => {
  return {
    type: CHECK_IN_TO_VENUE_FAIL,
    payload: data,
  };
};
