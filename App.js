import 'react-native-gesture-handler';
import React from 'react'; 
import { RootNav } from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import appStore from './src/state/Reducers/index';

export default function App() {
  return (
    <Provider store={appStore}>
      <RootNav />
    </Provider>
  );
}