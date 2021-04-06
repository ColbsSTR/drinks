import {takeLatest, call} from 'redux-saga/effects';
import {editDrink} from '../../services/Firebase/editDrink';
import {EDIT_DRINK} from '../Actions/actionTypes';
import {showToast} from '../../components/Toast';

export function* editDrinkWatcher() {
  yield takeLatest(EDIT_DRINK, editDrinkWorker);
}

export function* editDrinkWorker(action) {
  try {
    yield call(editDrink, action.payload);
    showToast('Drink updated!', 1250, '', 'success');
  } catch (err) {
    showToast(
      'Sorry, we had a problem updating that...',
      1500,
      'okay',
      'error',
    );
  }
}
