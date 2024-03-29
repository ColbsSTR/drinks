import {takeLatest, call, select, put} from 'redux-saga/effects';
import {REDEEM_DRINK} from '../../Actions/actionTypes';
import {sendAnalytic} from '../../../services/Firebase/sendAnalytic';
import {getUser} from '../../Selectors/getUserState';
import {redeemDrink} from '../../../services/Firebase/redeemDrink';
import {getUserData} from '../../Actions/User/getUserData';

export function* redeemDrinkWatcher() {
  yield takeLatest(REDEEM_DRINK, redeemDrinkWorker);
}

export function* redeemDrinkWorker(action) {
  try {
    const user = yield select(getUser);
    yield call(redeemDrink, action.payload, user);
    yield put(getUserData());
  } catch (err) {
    sendAnalytic({eventName: 'redeem_drink_fail', payload: {error: err}});
  }
}
