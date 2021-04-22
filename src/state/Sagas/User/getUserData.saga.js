import {takeLatest, put, call, select} from 'redux-saga/effects';
import {start, succeed, fail} from '../../Actions/User/getUserData';
import {getUserData} from '../../../services/Firebase/users';
import {GET_USER_DATA} from '../../Actions/actionTypes';
import {getUser} from '../../Selectors/getUserState';

export function* getUserDataWatcher() {
  yield takeLatest(GET_USER_DATA, getUserDataWorker);
}

export function* getUserDataWorker() {
  yield put(start());

  try {
    const user = yield select(getUser);
    const userData = yield call(getUserData, user);
    yield put(succeed({dbData: userData, authData: user}));
  } catch (err) {
    yield put(fail(err));
  }
}
