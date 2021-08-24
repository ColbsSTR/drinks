import {all, call} from 'redux-saga/effects';
import {getDrinksWatcher} from './Drinks/getDrinks.saga';
import {venuesWatcher} from './venues.saga';
import {reviewsWatcher} from './reviews.saga';
import {authenticationWatcher} from './authentication.saga';
import {updateUserDisplayNameWatcher} from './User/updateDisplayName.saga';
import {getUserDataWatcher} from './User/getUserData.saga';
import {addDrinkWatcher} from './Drinks/addDrink.saga';
import {editDrinkWatcher} from './Drinks/editDrink.saga';
import {sendNotificationWatcher} from './sendNotification.saga';
import {buildShareLinkWatcher} from './buildShareLink.saga';
import {feedbackWatcher} from './feedback.saga';
import likedDrinks from './LikedDrinks';
import {redeemDrinkWatcher} from './Drinks/redeemDrink.saga';
import {asyncStorageWatcher} from './async.saga';

//***TODO*****//
// RESEARCH BEST WAY TO SET THIS UP
//************//
export function* rootSaga() {
  yield all([
    call(getDrinksWatcher),
    call(venuesWatcher),
    call(reviewsWatcher),
    call(likedDrinks),
    call(authenticationWatcher),
    call(addDrinkWatcher),
    call(editDrinkWatcher),
    call(updateUserDisplayNameWatcher),
    call(getUserDataWatcher),
    call(sendNotificationWatcher),
    call(buildShareLinkWatcher),
    call(feedbackWatcher),
    call(redeemDrinkWatcher),
    call(asyncStorageWatcher),
  ]);
}
