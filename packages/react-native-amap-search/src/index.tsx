import { NativeModules } from 'react-native';

import useAMapSearch from './useSearch';

const AMapSearchManager = NativeModules.AMapSearchManager;

const init = AMapSearchManager.init1;

export { useAMapSearch, init };
