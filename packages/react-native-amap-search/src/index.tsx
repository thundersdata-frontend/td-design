// import { NativeModules } from 'react-native';

// type AmapSearchType = {
//   multiply(a: number, b: number): Promise<number>;
// };

// const { AmapSearch } = NativeModules;

// export default AmapSearch as AmapSearchType;

import { NativeModules } from 'react-native';
import useAMapSearch from './search/useSearch';

const AMapSearchManager = NativeModules.AMapSearchManager;

const init = AMapSearchManager.init1;

export { useAMapSearch, init };
