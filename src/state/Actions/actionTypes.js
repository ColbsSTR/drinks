// Modals
export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// Login
export const LOGIN_AS_GUEST = 'LOGIN_AS_GUEST';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_CANCELLED = 'LOGIN_CANCELLED';

// Logout
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCEED = 'LOGOUT_SUCCEED';
export const RESET_DEALS = 'RESET_DEALS';

// Location
export const SET_LOCATION = 'SET_LOCATION';

// Update state (instead of calling firebase again, change the local state to represent changes)
export const UPDATE_DRINK_RATING = 'UPDATE_DRINK_RATING';

//**********************//
//ASYNC OPERATIONS TYPES//
//**********************//

// Get all drinks from firebase
export const GET_ALL_DRINKS = 'GET_ALL_DRINKS';
export const GET_ALL_DRINKS_START = 'GET_ALL_DRINKS_START';
export const GET_ALL_DRINKS_SUCCEED = 'GET_ALL_DRINKS_SUCCEED';
export const GET_ALL_DRINKS_FAIL = 'GET_ALL_DRINKS_FAIL';

// Get information about the venue
export const GET_VENUEINFORMATION = 'GET_VENUEINFORMATION';
export const GET_VENUEINFORMATION_START = 'GET_VENUEINFORMATION_START';
export const GET_VENUEINFORMATION_SUCCEED = 'GET_VENUEINFORMATION_SUCCEED';
export const GET_VENUEINFORMATION_FAIL = 'GET_VENUEINFORMATION_FAIL';

//Write reviews to firebase
export const WRITE_REVIEW = 'WRITE_REVIEW';
export const WRITE_REVIEW_START = 'WRITE_REVIEW_START';
export const WRITE_REVIEW_SUCCEED = 'WRITE_REVIEW_SUCCEED';
export const WRITE_REVIEW_FAIL = 'WRITE_REVIEW_FAIL';

//Get liked drinks
export const GET_LIKED_DRINKS = 'GET_LIKED_DRINKS';
export const GET_LIKED_DRINKS_START = 'GET_LIKED_DRINKS_START';
export const GET_LIKED_DRINKS_SUCCEED = 'GET_LIKED_DRINKS_SUCCEED';
export const GET_LIKED_DRINKS_FAIL = 'GET_LIKED_DRINKS_FAIL';

//Write new liked drinks
export const ADD_LIKED_DRINK = 'ADD_LIKED_DRINK';
export const ADD_LIKED_DRINK_START = 'ADD_LIKED_DRINK_START';
export const ADD_LIKED_DRINK_SUCCEED = 'ADD_LIKED_DRINK_SUCCEED';
export const ADD_LIKED_DRINK_FAIL = 'ADD_LIKED_DRINK_FAIL';

//Remove new liked drinks
export const REMOVE_LIKED_DRINK = 'REMOVE_LIKED_DRINK';
export const REMOVE_LIKED_DRINK_START = 'REMOVE_LIKED_DRINK_START';
export const REMOVE_LIKED_DRINK_SUCCEED = 'REMOVE_LIKED_DRINK_SUCCEED';
export const REMOVE_LIKED_DRINK_FAIL = 'REMOVE_LIKED_DRINK_FAIL';