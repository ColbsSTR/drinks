import { GET_VENUEINFORMATION_START, GET_VENUEINFORMATION_SUCCEED, GET_VENUEINFORMATION_FAIL } from '../Actions/actionTypes';

const initialState = {
    isWaiting: false,
    venueInformation: [],
}

const venueInformation = (state = initialState, action) => {
    switch(action.type) {
        case GET_VENUEINFORMATION_START:
            return { ...state, isWaiting: true };
        case GET_VENUEINFORMATION_SUCCEED:
            return { ...state, isWaiting: false, venueInformation: action.payload };
        case GET_VENUEINFORMATION_FAIL:
            return { ...state, isWaiting: false, venueInformation: action.payload };
        default:
            return state
    }
}

export default venueInformation;