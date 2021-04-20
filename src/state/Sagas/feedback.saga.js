import {takeLatest, select, call} from 'redux-saga/effects';
import {getUser} from '../Selectors/getUserState';
import {GET_FEEDBACK_USER} from '../Actions/actionTypes';
import {setFeedback} from '../../services/Firebase/feedback';

export function* feedbackWatcher() {
  yield takeLatest(GET_FEEDBACK_USER, feedbackWorker);
}

export function* feedbackWorker(action) {
  const user = yield select(getUser);
  yield call(setFeedback, action.payload, user);
}
