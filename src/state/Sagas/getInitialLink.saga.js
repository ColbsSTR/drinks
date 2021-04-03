import {takeLatest, call} from 'redux-saga/effects';
import {
  getInitialLink,
  handleDynamicLink,
} from '../../services/Firebase/getInitialLink';
import {GET_INITIAL_LINK} from '../Actions/actionTypes';

export function* getInitialLinkWatcher() {
  yield takeLatest(GET_INITIAL_LINK, getInitialLinkWorker);
}

export function* getInitialLinkWorker(action) {
  try {
    const link = yield call(getInitialLink, action.payload);
    yield call(handleDynamicLink, link);
  } catch (err) {
    console.log(err);
  }
}
