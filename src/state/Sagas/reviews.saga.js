import {takeLatest, put, call, select} from 'redux-saga/effects';
import {writeReviews, writeNewRating} from '../../services/Firebase/reviews';
import {start, succeed, fail, updateDrinkRating} from '../Actions/reviews';
import {WRITE_REVIEW} from '../Actions/actionTypes';
import {getUser} from '../Selectors/getUserState';
import {getDrinks} from '../Selectors/getDrinksState';
import {mergeReviewData} from '../../utilities/transformers/mergeReviewData';
import {showToast} from '../../components/Toast';

export function* reviewsWatcher() {
  yield takeLatest(WRITE_REVIEW, writeReviewsWorker);
}

export function* writeReviewsWorker(action) {
  const {docID} = action.payload;
  yield put(start());

  try {
    const user = yield select(getUser);
    const allDrinks = yield select(getDrinks);
    yield call(writeReviews, action.payload, user);
    yield put(succeed());
    const newRating = yield call(writeNewRating, action.payload);
    const newDrinks = yield call(mergeReviewData, {docID, rating: newRating, allDrinks}); // newDrinks contains all of the old drink data with the new review data. This is so we don't have to call firebase again
    yield put(updateDrinkRating(newDrinks));
    showToast('Submitted!', 1250, '', 'success');
  } catch (err) {
    yield put(fail(err));
    showToast('Sorry, we had a problem sunmitting that...', 1500, 'okay', 'error');
  }
}
