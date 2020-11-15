import { takeLatest, put, call } from 'redux-saga/effects';
import { getTopDeals } from '../../services/Firebase/topDeals';
import { start, succeed, fail } from '../Actions/topDeals';
import { GET_TOPDEALS } from '../Actions/actionTypes';

export function* topDealsWatcher() {
    yield takeLatest(GET_TOPDEALS, topDealsWorker);
}

export function* topDealsWorker() {
    yield put(start());

    try {
        const response = yield call(getTopDeals);
        yield put(succeed(response));
        // **TODO**
        //Add success message here
    } catch (err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}