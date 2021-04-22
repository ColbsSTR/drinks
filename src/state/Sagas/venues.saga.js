import {takeLatest, put, call, select} from 'redux-saga/effects';
import {getVenue} from '../../services/Firebase/venueInformation';
import {start, succeed, fail} from '../Actions/venueInformation';
import {checkInStart, checkInSucceed, checkInFail} from '../Actions/checkIn';
import {GET_VENUEINFORMATION, CHECK_IN_TO_VENUE} from '../Actions/actionTypes';
import {getDrinks} from '../Selectors/getDrinksState';
import {checkInToVenue} from '../../services/Firebase/checkInToVenue';
import {showToast} from '../../components/Toast';
import {getUser} from '../Selectors/getUserState';

export function* venuesWatcher() {
  yield takeLatest(GET_VENUEINFORMATION, venueInformationWorker);
  yield takeLatest(CHECK_IN_TO_VENUE, venueCheckInWorker);
}

export function* venueInformationWorker(action) {
  yield put(start());

  try {
    const venue = yield call(getVenue, action.payload);
    const allDrinks = yield select(getDrinks);
    yield put(succeed({venue, allDrinks}));
  } catch (err) {
    yield put(fail(err));
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
