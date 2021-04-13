import {EDIT_DRINK} from './actionTypes';

export const editDrink = (data) => {
  return {
    type: EDIT_DRINK,
    payload: data,
  };
};
