import {all, call} from 'redux-saga/effects';
import {drinksWatcher} from './drinks.saga';
import {venuesWatcher} from './venues.saga';
import {reviewsWatcher} from './reviews.saga';
import {authenticationWatcher} from './authentication.saga';
import {updateUserDisplayNameWatcher} from './User/updateDisplayName.saga';
import {getUserDataWatcher} from './User/getUserData.saga';
import {addDrinkWatcher} from './addDrink.saga';
import {editDrinkWatcher} from './editDrink.saga';
import {sendNotificationWatcher} from './sendNotification.saga';
import likedDrinks from './LikedDrinks';

//***TODO*****//
// RESEARCH BEST WAY TO SET THIS UP
//************//
export function* rootSaga() {
  yield all([
    call(drinksWatcher),
    call(venuesWatcher),
    call(reviewsWatcher),
    call(likedDrinks),
    call(authenticationWatcher),
    call(addDrinkWatcher),
    call(editDrinkWatcher),
    call(updateUserDisplayNameWatcher),
    call(getUserDataWatcher),
    call(sendNotificationWatcher),
  ]);
}
