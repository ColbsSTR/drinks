import { takeLatest, put, call } from 'redux-saga/effects';
import { writeReviews } from '../../services/Firebase/reviews';
import { start, succeed, fail } from '../Actions/reviews';
import { WRITE_REVIEW } from '../Actions/actionTypes';

export function* reviewsWatcher() {
    yield takeLatest(WRITE_REVIEW, writeReviewsWorker);
}

export function* writeReviewsWorker(action) {
    yield put(start());

    try {
        yield call(writeReviews, action.payload);
        yield put(succeed());
        // **TODO**
        //Add success message here
    } catch(err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}