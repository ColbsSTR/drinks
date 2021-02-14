import { all, call } from 'redux-saga/effects';
import { drinksWatcher } from './drinks.saga';
import { venueInformationWatcher } from './venueInformation.saga';
import { reviewsWatcher } from './reviews.saga';
import { authenticationWatcher } from './authentication.saga';
import likedDrinks from './LikedDrinks';

//***TODO*****//
// RESEARCH BEST WAY TO SET THIS UP
//************//
export function* rootSaga() {
	yield all([
		call(drinksWatcher),
		call(venueInformationWatcher),
		call(reviewsWatcher),
		call(likedDrinks),
		call(authenticationWatcher),
	]);
};