import 'react-native-gesture-handler';
import React from 'react'; 
import { RootNav } from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import { Root } from "native-base";
import appStore from './src/state/Reducers/index';

export default function App() {

  return (
    <Root>
      <Provider store={appStore}>
        <RootNav />
      </Provider>
    </Root>
  );
}