import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import modals from './modals.reducer';
import topDeals from './topDeals.reducer';
import venueInformation from './venueInformation.reducer';
import authentication from './authentication.reducer';
import reviews from './reviews.reducer';
import likedDrinks from './LikedDrinks';
import { rootSaga } from '../Sagas/index';

const AppReducers = combineReducers({
    //where the reducers go
    modals,
    topDeals,
    venueInformation,
    authentication,
    reviews,
    likedDrinks,
});

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(
    AppReducers,  
    applyMiddleware(
        sagaMiddleware,
    )
);

sagaMiddleware.run(rootSaga);

export default appStore;