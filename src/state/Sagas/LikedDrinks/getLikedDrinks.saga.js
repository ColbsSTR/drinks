import { takeLatest, put, call } from 'redux-saga/effects';
import { getLikedDrinks } from '../../../services/Firebase/likedDrinks';
import { start, succeed, fail } from '../../Actions/LikedDrinks/getLikedDrinks';
import { GET_LIKED_DRINKS } from '../../Actions/actionTypes';

export function* getLikedDrinksWatcher() {
    yield takeLatest(GET_LIKED_DRINKS, getLikedDrinksWorker);
}

export function* getLikedDrinksWorker() {
    yield put(start());

    try {
        const response = yield call(getLikedDrinks);
        yield put(succeed(response));
        // **TODO**
        //Add success message here
    } catch (err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}