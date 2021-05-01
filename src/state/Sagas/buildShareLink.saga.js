import {takeLatest, call} from 'redux-saga/effects';
import {buildShareLink, onShare} from '../../services/Firebase/buildShareLink';
import {BUILD_SHARE_LINK} from '../Actions/actionTypes';

export function* buildShareLinkWatcher() {
  yield takeLatest(BUILD_SHARE_LINK, buildShareLinkWorker);
}

export function* buildShareLinkWorker(action) {
  try {
    const link = yield call(buildShareLink, action.payload);
    yield call(onShare, link);
  } catch (err) {
    console.log(err);
  }
}
