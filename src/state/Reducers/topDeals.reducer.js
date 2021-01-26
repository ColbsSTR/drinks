import { GET_TOPDEALS_START, GET_TOPDEALS_SUCCEED, GET_TOPDEALS_FAIL, RESET_DEALS } from '../Actions/actionTypes';
import { mergeDrinkData } from '../../utilities/mergeDrinkData';

const initialState = {
    isWaiting: false,
    deals: [],
    likedDrinks: [],
}

const topDeals = (state = initialState, action) => {
    switch(action.type) {
        case GET_TOPDEALS_START:
            return { ...state, isWaiting: true };
        case GET_TOPDEALS_SUCCEED:
            const { topDeals, likedDrinks } = action.payload;
            const deals = mergeDrinkData(topDeals, likedDrinks);
            return { ...state, isWaiting: false, deals, likedDrinks };
        case GET_TOPDEALS_FAIL:
            return { ...state, isWaiting: false, error: action.payload };
        case RESET_DEALS:
            return initialState;
        default:
            return state;
    }
}

export default topDeals;