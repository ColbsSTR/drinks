import { all, call } from 'redux-saga/effects';
import { topDeals } from './topDeals.saga';
import { venueInformation } from './venueInformation.saga';

//***TODO*****//
// RESEARCH BEST WAY TO SET THIS UP
//************//
export function* rootSaga() {
    yield all([
        call(topDeals),
        call(venueInformation),
    ]);
};