import { takeLatest, put, call, select } from 'redux-saga/effects';
import { addLikedDrink } from '../../../services/Firebase/likedDrinks';
import { start, succeed, fail } from '../../Actions/LikedDrinks/addLikedDrink';
import { getTopDeals } from '../../Actions/topDeals';
import { ADD_LIKED_DRINK } from '../../Actions/actionTypes';
import { getUser } from '../../Selectors/getUserState';

export function* addLikedDrinkWatcher() {
    yield takeLatest(ADD_LIKED_DRINK, addLikedDrinkWorker);
}

export function* addLikedDrinkWorker(action) {
    yield put(start());

    try {
        const user = yield select(getUser);
        yield call(addLikedDrink, action.payload, user );
        yield put(succeed());
        yield put(getTopDeals());
    } catch(err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}