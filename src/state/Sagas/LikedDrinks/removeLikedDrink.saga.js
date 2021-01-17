import { takeLatest, put, call, select } from 'redux-saga/effects';
import { removeLikedDrink } from '../../../services/Firebase/likedDrinks';
import { start, succeed, fail } from '../../Actions/LikedDrinks/removeLikedDrink';
import { getTopDeals } from '../../Actions/topDeals';
import { REMOVE_LIKED_DRINK } from '../../Actions/actionTypes';
import { getUser } from '../../Selectors/getUserState';

export function* removeLikedDrinkWatcher() {
    yield takeLatest(REMOVE_LIKED_DRINK, removeLikedDrinkWorker);
}

export function* removeLikedDrinkWorker(action) {
    yield put(start());

    try {
        const user = yield select(getUser);
        yield call(removeLikedDrink, action.payload, user);
        yield put(succeed());
        yield put(getTopDeals());
    } catch(err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}