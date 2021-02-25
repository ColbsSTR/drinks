import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getAllDrinks } from '../../services/Firebase/drinks';
import { getLikedDrinks } from '../../services/Firebase/likedDrinks';
import { start, succeed, fail } from '../Actions/drinks';
import { GET_ALL_DRINKS } from '../Actions/actionTypes';
import { getUser } from '../Selectors/getUserState';

export function* drinksWatcher() {
    yield takeLatest(GET_ALL_DRINKS, drinksWorker);
}

export function* drinksWorker() {
    yield put(start());

    try {
        const allDrinks = yield call(getAllDrinks);
        const user = yield select(getUser);
        const likedDrinks = yield call(getLikedDrinks, user);
        yield put(succeed({allDrinks, likedDrinks}));
    } catch (err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}