import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getTopDeals } from '../../services/Firebase/topDeals';
import { getLikedDrinks } from '../../services/Firebase/likedDrinks';
import { start, succeed, fail } from '../Actions/topDeals';
import { GET_TOPDEALS } from '../Actions/actionTypes';
import { getUser } from '../Selectors/getUserState';

export function* topDealsWatcher() {
    yield takeLatest(GET_TOPDEALS, topDealsWorker);
}

export function* topDealsWorker() {
    yield put(start());

    try {
        const topDeals = yield call(getTopDeals);
        const user = yield select(getUser);
        const likedDrinks = yield call(getLikedDrinks, user);
        yield put(succeed({topDeals, likedDrinks}));
    } catch (err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}