import {all, call} from 'redux-saga/effects';
import {drinksWatcher} from './drinks.saga';
import {venueInformationWatcher} from './venueInformation.saga';
import {reviewsWatcher} from './reviews.saga';
import {authenticationWatcher} from './authentication.saga';
import {updateUserDisplayNameWatcher} from './User/updateDisplayName.saga';
import {addDrinkWatcher} from './addDrink.saga';
import {sendNotificationWatcher} from './sendNotification.saga';
import {buildShareLinkWatcher} from './buildShareLink.saga';
import {getInitialLinkWatcher} from './getInitialLink.saga';
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
    call(addDrinkWatcher),
    call(updateUserDisplayNameWatcher),
    call(sendNotificationWatcher),
    call(buildShareLinkWatcher),
    call(getInitialLinkWatcher),
  ]);
}
