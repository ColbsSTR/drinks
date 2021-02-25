import { takeLatest, put, call, select } from 'redux-saga/effects';
import { removeLikedDrink, getLikedDrinks } from '../../../services/Firebase/likedDrinks';
import { start, fail } from '../../Actions/LikedDrinks/removeLikedDrink';
import { succeed } from '../../Actions/drinks';
import { REMOVE_LIKED_DRINK, REMOVE_LIKED_DRINK_SUCCEED } from '../../Actions/actionTypes';
import { getUser } from '../../Selectors/getUserState';
import { getDrinks } from '../../Selectors/getDrinksState';

export function* removeLikedDrinkWatcher() {
    yield takeLatest(REMOVE_LIKED_DRINK, removeLikedDrinkWorker);
}

export function* removeLikedDrinkWorker(action) {
    yield put(start());

    try {
        const user = yield select(getUser);
        const allDrinks = yield select(getDrinks);
        yield call(removeLikedDrink, action.payload, user);
        const likedDrinks = yield call(getLikedDrinks, user);
        yield put({ type: REMOVE_LIKED_DRINK_SUCCEED });
        yield put(succeed({allDrinks, likedDrinks})); //Calling getAllDrinks succeed here to merge liked drinks with state
    } catch(err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}
