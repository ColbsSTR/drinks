import {takeLatest, put, call, select} from 'redux-saga/effects';
import {getVenue} from '../../services/Firebase/venueInformation';
import {start, succeed, fail} from '../Actions/venueInformation';
import {GET_VENUEINFORMATION} from '../Actions/actionTypes';
import {getDrinks} from '../Selectors/getDrinksState';

export function* venueInformationWatcher() {
  yield takeLatest(GET_VENUEINFORMATION, venueInformationWorker);
}

export function* venueInformationWorker(action) {
  yield put(start());

  try {
    const venue = yield call(getVenue, action.payload);
    const allDrinks = yield select(getDrinks);
    yield put(succeed({venue, allDrinks}));
  } catch (err) {
    yield put(fail(err));
    // **TODO**
    //Add error handling logic here. Modal, error toast, etc...
  }
}
