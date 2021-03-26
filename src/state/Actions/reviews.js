import {
  WRITE_REVIEW,
  WRITE_REVIEW_START,
  WRITE_REVIEW_SUCCEED,
  WRITE_REVIEW_FAIL,
  UPDATE_DRINK_RATING,
} from './actionTypes';

//NON-ASNYC
export const updateDrinkRating = (data) => {
  return {
    type: UPDATE_DRINK_RATING,
    payload: data,
  };
};

//ASYNC
export const writeReview = (data) => {
  return {
    type: WRITE_REVIEW,
    payload: data,
  };
};

export const start = () => {
  return {
    type: WRITE_REVIEW_START,
  };
};

export const succeed = () => {
  return {
    type: WRITE_REVIEW_SUCCEED,
  };
};

export const fail = () => {
  return {
    type: WRITE_REVIEW_FAIL,
  };
};
