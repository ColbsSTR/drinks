import { takeLatest, put, call } from 'redux-saga/effects';
import { getVenue } from '../../services/Firebase/venueInformation';
import { start, succeed, fail } from '../Actions/venueInformation';
import { GET_VENUEINFORMATION } from '../Actions/actionTypes';

export function* venueInformation() {
    yield takeLatest(GET_VENUEINFORMATION, venueInformationWorker);
}

export function* venueInformationWorker(action) {
    yield put(start());

    try {
        const response = yield call(getVenue, action.payload);
        yield put(succeed(response));
    } catch (err) {
        yield put(fail(err));
    }
}