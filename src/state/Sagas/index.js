import { all, call } from 'redux-saga/effects';
import { topDealsWatcher } from './topDeals.saga';
import { venueInformationWatcher } from './venueInformation.saga';
import { reviewsWatcher } from './reviews.saga';
//***TODO*****//
// RESEARCH BEST WAY TO SET THIS UP
//************//
export function* rootSaga() {
    yield all([
        call(topDealsWatcher),
        call(venueInformationWatcher),
        call(reviewsWatcher),
    ]);
};