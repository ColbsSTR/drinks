import {MAP_ASYNC_VALUE_TO_STATE} from '../Actions/actionTypes';

const initialState = {
  async: {},
};

const async = (state = initialState, action) => {
  switch (action.type) {
    case MAP_ASYNC_VALUE_TO_STATE:
      return {...state, [action.payload.key]: action.payload.data};
    default:
      return state;
  }
};

export default async;
