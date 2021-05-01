import {takeLatest, put, call, select} from 'redux-saga/effects';
import {getVenues, checkInToVenue} from '../../services/Firebase/venues';
import {getAllVenuesStart, getAllVenuesSucceed, getAllVenuesFail} from '../Actions/getAllVenues';
import {checkInStart, checkInSucceed, checkInFail} from '../Actions/checkIn';
import {CHECK_IN_TO_VENUE, GET_ALL_VENUES} from '../Actions/actionTypes';
import {showToast} from '../../components/Toast';
import {getUser} from '../Selectors/getUserState';
import {getUserData} from '../Actions/User/getUserData';
import {selectAllVenues} from '../Selectors/getVenuesState';

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
    const {venueId, checkIns} = action.payload;
    yield call(checkInToVenue, {selectedVenueId: venueId, checkIns: checkIns ? checkIns : 0, user});
    const allVenues = yield select(selectAllVenues);
    yield put(checkInSucceed({allVenues, venueId}));
    yield put(getUserData()); // Refresh user data since the document has been updated with their check ins
    showToast('Checked In!', 1250, '', 'success');
  } catch (err) {
    yield put(checkInFail());
    showToast('Sorry, something went wrong...', 1250, '', 'error');
  }
}
