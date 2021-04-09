import {
  GET_VENUEINFORMATION_START,
  GET_VENUEINFORMATION_SUCCEED,
  GET_VENUEINFORMATION_FAIL,
} from '../Actions/actionTypes';
import {TransformVenueDrinks} from '../../utilities/transformers/venues';

const initialState = {
  isWaiting: false,
  allVenues: [],
};

const venues = (state = initialState, action) => {
  switch (action.type) {
    case GET_VENUEINFORMATION_START:
      return {...state, isWaiting: true};
    case GET_VENUEINFORMATION_SUCCEED:
      const transformedVenueObject = TransformVenueDrinks(action.payload);
      return {
        ...state,
        isWaiting: false,
        allVenues: [...state.allVenues, transformedVenueObject],
      };
    case GET_VENUEINFORMATION_FAIL:
      return {...state, isWaiting: false};
    default:
      return state;
  }
};

export default venues;
