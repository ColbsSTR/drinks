import { combineReducers, createStore } from 'redux';

const AppReducers = combineReducers({
    //where the reducers go
});

const appStore = createStore(AppReducers);

export default appStore;