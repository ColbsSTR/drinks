import {
  GET_VENUEINFORMATION_START,
  GET_VENUEINFORMATION_SUCCEED,
  GET_VENUEINFORMATION_FAIL,
  GET_ALL_VENUES_START,
  GET_ALL_VENUES_FAIL,
  GET_ALL_VENUES_SUCCEED,
} from '../Actions/actionTypes';

const initialState = {
  isWaiting: false,
  venueInformation: [],
  venues: [],
};

const venueInformation = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VENUES_START:
      return {...state, isWaiting: true};
    case GET_ALL_VENUES_SUCCEED:
      return {...state, venues: action.payload};
    case GET_ALL_VENUES_FAIL:
      return {...state, venues: []};
    case GET_VENUEINFORMATION_START:
      return {...state, isWaiting: true};
    case GET_VENUEINFORMATION_SUCCEED:
      return {...state, isWaiting: false, venueInformation: action.payload};
    case GET_VENUEINFORMATION_FAIL:
      return {...state, isWaiting: false, venueInformation: action.payload};
    default:
      return state;
  }
};

export default venueInformation;
