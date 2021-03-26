import { takeLatest, put, call, select } from 'redux-saga/effects';
import { addLikedDrink, getLikedDrinks } from '../../../services/Firebase/likedDrinks';
import { start, fail } from '../../Actions/LikedDrinks/addLikedDrink';
import { succeed } from '../../Actions/drinks';
import { ADD_LIKED_DRINK, ADD_LIKED_DRINK_SUCCEED } from '../../Actions/actionTypes';
import { getUser } from '../../Selectors/getUserState';
import { getDrinks } from '../../Selectors/getDrinksState';

export function* addLikedDrinkWatcher() {
    yield takeLatest(ADD_LIKED_DRINK, addLikedDrinkWorker);
}

export function* addLikedDrinkWorker(action) {
    yield put(start());

    try {
        const user = yield select(getUser);
        const allDrinks = yield select(getDrinks);
        yield call(addLikedDrink, action.payload, user);
        const likedDrinks = yield call(getLikedDrinks, user);
        yield put({ type: ADD_LIKED_DRINK_SUCCEED });
        yield put(succeed({allDrinks, likedDrinks})); //Calling getAllDrinks succeed here to merge new liked drinks
    } catch(err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}