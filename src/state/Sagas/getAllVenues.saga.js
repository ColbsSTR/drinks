import {takeLatest, put, call} from 'redux-saga/effects';
import {getVenues} from '../../services/Firebase/venues';
import {
  getAllVenuesStart,
  getAllVenuesSucceed,
  getAllVenuesFail,
} from '../Actions/getAllVenues';
import {GET_ALL_VENUES} from '../Actions/actionTypes';

export function* getAllVenuesWatcher() {
  yield takeLatest(GET_ALL_VENUES, getAllVenuesWorker);
}

export function* getAllVenuesWorker() {
  yield put(getAllVenuesStart());

  try {
    const venues = yield call(getVenues);
    yield put(getAllVenuesSucceed(venues));
  } catch (err) {
    yield put(getAllVenuesFail(err));
    // **TODO**
    //Add error handling logic here. Modal, error toast, etc...
  }
}
