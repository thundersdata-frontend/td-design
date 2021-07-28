import { NativeModules } from 'react-native';

type AmapSearchType = {
  multiply(a: number, b: number): Promise<number>;
};

const { AmapSearch } = NativeModules;

export default AmapSearch as AmapSearchType;
