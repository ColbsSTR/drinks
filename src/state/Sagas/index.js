import { all, call } from 'redux-saga/effects';
import { topDeals } from './topDeals.saga';

export function* rootSaga() {
    yield all([
        call(topDeals),
    ]);
};