import { GET_ALL_DRINKS_START, GET_ALL_DRINKS_SUCCEED, GET_LIKED_DRINKS_FAIL, RESET_DEALS, UPDATE_DRINK_RATING } from '../Actions/actionTypes';
import { mergeLikedDrinks } from '../../utilities/transformers/mergeLikedDrinks';
import { partitionTopDeals } from '../../utilities/transformers/topDeals';
import { partitionSpecialtyDrinks } from '../../utilities/transformers/specialtyDrinks';
import { partitionLocalDrinks } from '../../utilities/transformers/localDrinks';

const initialState = {
    isWaiting: false,
    allDrinks: [],
    deals: [],
    specialtyDrinks: [],
    localDrinks: [],
    likedDrinks: [],
}

const drinks = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_DRINKS_START:
            return { ...state, isWaiting: true };
        case GET_ALL_DRINKS_SUCCEED:
            const { allDrinks, likedDrinks } = action.payload;
            const drinks = mergeLikedDrinks(allDrinks, likedDrinks);
            const deals = partitionTopDeals(drinks);
            const specialtyDrinks = partitionSpecialtyDrinks(drinks);
            const localDrinks = partitionLocalDrinks(drinks);
            return { 
                ...state, 
                isWaiting: false, 
                deals, 
                specialtyDrinks,
                localDrinks,
                allDrinks: drinks,
                likedDrinks, 
            };
        case GET_LIKED_DRINKS_FAIL:
            return { ...state, isWaiting: false, error: action.payload };
        case RESET_DEALS:
            return initialState;
        case UPDATE_DRINK_RATING:
            const updateDeals = partitionTopDeals(action.payload);
            const updatedSpecialtyDrinks = partitionSpecialtyDrinks(action.payload);
            const updatedLocalDrinks = partitionLocalDrinks(action.payload);
            return { 
                ...state, 
                allDrinks: action.payload,
                deals: updateDeals, 
                specialtyDrinks: updatedSpecialtyDrinks,
                localDrinks: updatedLocalDrinks,
            };
        default:
            return state;
    }
}

export default drinks;