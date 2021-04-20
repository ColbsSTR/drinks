import {GET_FEEDBACK_USER} from './actionTypes';

export const getFeedbackUser = (data) => {
  return {
    type: GET_FEEDBACK_USER,
    payload: data,
  };
};
