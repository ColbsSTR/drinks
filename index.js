import 'react-native-gesture-handler';
import './src/config/reactotron';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {typography} from './src/utilities/typography';

typography();

AppRegistry.registerComponent(appName, () => App);
