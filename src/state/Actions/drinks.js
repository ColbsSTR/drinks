import {
  GET_ALL_DRINKS,
  GET_ALL_DRINKS_START,
  GET_ALL_DRINKS_SUCCEED,
  GET_ALL_DRINKS_FAIL,
} from './actionTypes';

export const getAllDrinks = () => {
  return {
    type: GET_ALL_DRINKS,
  };
};

export const start = () => {
  return {
    type: GET_ALL_DRINKS_START,
  };
};

export const succeed = (data) => {
  return {
    type: GET_ALL_DRINKS_SUCCEED,
    payload: data,
  };
};

export const fail = (data) => {
  return {
    type: GET_ALL_DRINKS_FAIL,
    payload: data,
  };
};
