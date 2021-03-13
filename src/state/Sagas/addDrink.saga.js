import { takeLatest, call } from 'redux-saga/effects';
import { addDrink } from '../../services/Firebase/addDrink';
import { ADD_DRINK } from '../Actions/actionTypes';
import { showToast } from '../../components/Toast';

export function* addDrinkWatcher() {
    yield takeLatest(ADD_DRINK, addDrinkWorker);
}

export function* addDrinkWorker(action) {
    try {
        yield call(addDrink, action.payload);
        showToast('Drink added!', 1250, '', 'success');
    } catch (err) {
        showToast('Sorry, we had a problem adding that...', 1500, 'okay', 'error');
    }
}