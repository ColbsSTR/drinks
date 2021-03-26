import {SEND_NOTIFICATION} from './actionTypes';

export const sendNotification = (data) => {
  return {
    type: SEND_NOTIFICATION,
    payload: data,
  };
};
