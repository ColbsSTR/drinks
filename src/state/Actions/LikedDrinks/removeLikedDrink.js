import {
  REMOVE_LIKED_DRINK,
  REMOVE_LIKED_DRINK_START,
  REMOVE_LIKED_DRINK_SUCCEED,
  REMOVE_LIKED_DRINK_FAIL,
} from '../actionTypes';

export const removeLikedDrink = (data) => {
  return {
    type: REMOVE_LIKED_DRINK,
    payload: data,
  };
};

export const start = () => {
  return {
    type: REMOVE_LIKED_DRINK_START,
  };
};

export const succeed = () => {
  return {
    type: REMOVE_LIKED_DRINK_SUCCEED,
  };
};

export const fail = (data) => {
  return {
    type: REMOVE_LIKED_DRINK_FAIL,
    payload: data,
  };
};
