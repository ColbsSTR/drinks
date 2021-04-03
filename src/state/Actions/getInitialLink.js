import {GET_INITIAL_LINK} from './actionTypes';

export const getInitialLink = (data) => {
  return {
    type: GET_INITIAL_LINK,
    payload: data,
  };
};
