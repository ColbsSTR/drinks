import { GET_LIKED_DRINKS_START, GET_LIKED_DRINKS_SUCCEED, GET_LIKED_DRINKS_FAIL } from '../../Actions/actionTypes';

const initialState = {
    isWaiting: false,
    error: null,
    likedDrinks: [],
}

const getLikedDrinks = (state = initialState, action) => {
    switch(action.type) {
        case GET_LIKED_DRINKS_START:
            return { ...state, isWaiting: true };
        case GET_LIKED_DRINKS_SUCCEED:
            return { ...state, isWaiting: false, likedDrinks: action.payload };
        case GET_LIKED_DRINKS_FAIL:
            return { ...state, isWaiting: false, error: action.payload };
        default:
            return state;
    }
}

export default getLikedDrinks;