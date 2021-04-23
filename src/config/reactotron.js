import Reactotron, {networking} from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  Reactotron.configure({
    name: 'Drinks App',
  }) // controls connection & communication settings
    .use(sagaPlugin())
    .use(networking())
    .useReactNative() // add all built-in react native plugins
    .connect();

  console.tron = Reactotron;
} else {
  console.tron = {log: () => false};
}
