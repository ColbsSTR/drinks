import {ADD_DRINK} from './actionTypes';

export const addDrink = (data) => {
  return {
    type: ADD_DRINK,
    payload: data,
  };
};
