import {takeLatest, put, call, select} from 'redux-saga/effects';
import {start, succeed, fail} from '../../Actions/User/getUserData';
import {getFirestoreUserData, getAuthData} from '../../../services/Firebase/users';
import {GET_USER_DATA} from '../../Actions/actionTypes';
import {getUser} from '../../Selectors/getUserState';

export function* getUserDataWatcher() {
  yield takeLatest(GET_USER_DATA, getUserDataWorker);
}

export function* getUserDataWorker() {
  yield put(start());

  try {
    const currentUser = yield select(getUser);
    const userDataFromAuth = yield call(getAuthData);
    const userDataFromFirestore = yield call(getFirestoreUserData, currentUser);
    yield put(succeed({dbData: userDataFromFirestore, authData: userDataFromAuth}));
  } catch (err) {
    yield put(fail(err));
  }
}
