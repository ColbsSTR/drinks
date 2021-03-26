import { all, call } from 'redux-saga/effects';
import { addLikedDrinkWatcher } from './addLikedDrink.saga';
import { removeLikedDrinkWatcher } from './removeLikedDrink.saga';
import { getLikedDrinksWatcher } from './getLikedDrinks.saga';

export default function* likedDrinks() {
	yield all([
		call(addLikedDrinkWatcher),
		call(removeLikedDrinkWatcher),
		call(getLikedDrinksWatcher),
	]);
};