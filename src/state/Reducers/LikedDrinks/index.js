import { combineReducers } from 'redux';
import addLikedDrink from './addLikedDrink.reducer';
import getLikedDrinks from './getLikedDrinks.reducer';
import removeLikedDrink from './removeLikedDrink.reducer';

export default combineReducers({
    addLikedDrink,
    getLikedDrinks,
    removeLikedDrink
});