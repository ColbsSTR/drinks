import {takeLatest, put, call, select} from 'redux-saga/effects';
import {getVenues, checkInToVenue} from '../../services/Firebase/venues';
import {getAllVenuesStart, getAllVenuesSucceed, getAllVenuesFail} from '../Actions/getAllVenues';
import {checkInStart, checkInSucceed, checkInFail} from '../Actions/checkIn';
import {CHECK_IN_TO_VENUE, GET_ALL_VENUES} from '../Actions/actionTypes';
import {showToast} from '../../components/Toast';
import {getUser} from '../Selectors/getUserState';

export function* venuesWatcher() {
  yield takeLatest(GET_ALL_VENUES, getAllVenuesWorker);
  yield takeLatest(CHECK_IN_TO_VENUE, venueCheckInWorker);
}

export function* getAllVenuesWorker() {
  yield put(getAllVenuesStart());

  try {
    const venues = yield call(getVenues);
    yield put(getAllVenuesSucceed(venues));
  } catch (err) {
    yield put(getAllVenuesFail(err));
    showToast('Sorry, something went wrong...', 1250, '', 'error');
  }
}

export function* venueCheckInWorker(action) {
  yield put(checkInStart());
  try {
    const user = yield select(getUser);
    const {docId, checkIns} = action.payload;
    yield call(checkInToVenue, {selectedVenueDocId: docId, checkIns, user});
    yield put(checkInSucceed());
    showToast('Checked In!', 1250, '', 'success');
  } catch (err) {
    yield put(checkInFail());
    showToast('Sorry, something went wrong...', 1250, '', 'error');
  }
}
