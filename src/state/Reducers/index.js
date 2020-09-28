import { combineReducers, createStore } from 'redux';
import modals from './modals';

const AppReducers = combineReducers({
    //where the reducers go
    modals,
});

const appStore = createStore(AppReducers);

export default appStore;