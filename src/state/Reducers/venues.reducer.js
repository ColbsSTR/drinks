import {
  GET_ALL_VENUES_START,
  GET_ALL_VENUES_FAIL,
  GET_ALL_VENUES_SUCCEED,
  CHECK_IN_TO_VENUE_START,
  CHECK_IN_TO_VENUE_SUCCEED,
  CHECK_IN_TO_VENUE_FAIL,
} from '../Actions/actionTypes';
import {updateCheckInCount} from '../../utilities/transformers/venues';

const initialState = {
  isWaiting: false,
  allVenues: [],
};

const venues = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VENUES_START:
      return {...state, isWaiting: true};
    case GET_ALL_VENUES_SUCCEED:
      return {...state, allVenues: action.payload, isWaiting: false};
    case GET_ALL_VENUES_FAIL:
      return {...state, allVenues: [], isWaiting: false};
    case CHECK_IN_TO_VENUE_START:
      return {...state, isWaiting: true};
    case CHECK_IN_TO_VENUE_SUCCEED:
      const updatedVenues = updateCheckInCount(action.payload); //retain parity with db
      return {...state, isWaiting: false, allVenues: updatedVenues};
    case CHECK_IN_TO_VENUE_FAIL:
      return {...state, isWaiting: false};
    default:
      return state;
  }
};

export default venues;
