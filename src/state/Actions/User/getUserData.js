import {
  GET_USER_DATA,
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCEED,
  GET_USER_DATA_FAIL,
} from '../actionTypes';

export const getUserData = () => {
  return {
    type: GET_USER_DATA,
  };
};

export const start = () => {
  return {
    type: GET_USER_DATA_START,
  };
};

export const succeed = (data) => {
  return {
    type: GET_USER_DATA_SUCCEED,
    payload: data,
  };
};

export const fail = (err) => {
  return {
    type: GET_USER_DATA_FAIL,
    payload: err,
  };
};
