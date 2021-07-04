import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { enableES5 } from 'immer';

enableES5();

AppRegistry.registerComponent(appName, () => App);
