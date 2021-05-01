import {BUILD_SHARE_LINK} from './actionTypes';

export const buildShareLink = (data) => {
  return {
    type: BUILD_SHARE_LINK,
    payload: data,
  };
};
