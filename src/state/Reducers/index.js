import {combineReducers, createStore, applyMiddleware} from 'redux';
import Reactotron from 'reactotron-react-native';
import createSagaMiddleware from 'redux-saga';
import modals from './modals.reducer';
import drinks from './drinks.reducer';
import venues from './venues.reducer';
import authentication from './authentication.reducer';
import reviews from './reviews.reducer';
import likedDrinks from './LikedDrinks';
import location from './location.reducer';
import updateDisplayName from './User/updateDisplayName.reducer';
import {rootSaga} from '../Sagas/index';

const AppReducers = combineReducers({
  //where the reducers go
  modals,
  drinks,
  venues,
  authentication,
  reviews,
  likedDrinks,
  location,
  updateDisplayName,
});

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const appStore = createStore(AppReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default appStore;
