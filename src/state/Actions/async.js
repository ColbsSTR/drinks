import {GET_VALUE_FROM_ASYNC, SET_ASYNC_VALUE, MAP_ASYNC_VALUE_TO_STATE} from './actionTypes';

export const getValueFromAsync = (key) => {
  return {
    type: GET_VALUE_FROM_ASYNC,
    payload: key,
  };
};

export const setAsyncValue = (key, data) => {
  return {
    type: SET_ASYNC_VALUE,
    payload: {key, data},
  };
};

export const mapAsyncValueToState = (key, data) => {
  return {
    type: MAP_ASYNC_VALUE_TO_STATE,
    payload: {key, data},
  };
};
