import {SEND_NOTIFICATION} from './actionTypes';

export const sendNotification = (data) => {
    console.log('dispatchaction');
  return {
    type: SEND_NOTIFICATION,
    payload: data,
  };
};
