import {REDEEM_DRINK} from './actionTypes';

export const redeemDrink = (data) => {
  return {
    type: REDEEM_DRINK,
    payload: data,
  };
};
