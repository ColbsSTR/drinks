import 'react-native-gesture-handler';
import React, { useEffect } from 'react'; 
import SplashScreen from 'react-native-splash-screen';
import { RootNav } from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import { Root } from "native-base";
import appStore from './src/state/Reducers/index';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Root>
      <Provider store={appStore}>
        <RootNav />
      </Provider>
    </Root>
  );
}