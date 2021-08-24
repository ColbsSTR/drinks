import {takeLatest, call, put} from 'redux-saga/effects';
import {GET_VALUE_FROM_ASYNC, SET_ASYNC_VALUE} from '../Actions/actionTypes';
import {getValue, setValue} from '../../services/async';
import {mapAsyncValueToState} from '../Actions/async';

export function* asyncStorageWatcher() {
  yield takeLatest(GET_VALUE_FROM_ASYNC, getValueWorker);
  yield takeLatest(SET_ASYNC_VALUE, setValueWorker);
}

export function* getValueWorker(action) {
  try {
    const value = yield call(getValue, action.payload);
    yield put(mapAsyncValueToState({key: action.payload, value}));
  } catch (e) {
    console.error('error getting async value', e);
  }
}

export function* setValueWorker(action) {
  try {
    yield call(setValue, action.payload);
  } catch (e) {
    console.error('error setting async value', e);
  }
}
