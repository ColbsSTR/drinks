import { GET_ALL_DRINKS_START, GET_ALL_DRINKS_SUCCEED, GET_LIKED_DRINKS_FAIL, RESET_DEALS } from '../Actions/actionTypes';
import { mergeDrinkData } from '../../utilities/mergeDrinkData';
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
            const drinks = mergeDrinkData(allDrinks, likedDrinks);
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
        default:
            return state;
    }
}

export default drinks;