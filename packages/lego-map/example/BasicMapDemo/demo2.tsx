import { BasicMap } from '@td-design/lego-map';
import sichuan from './sichuan.json';

export default () => {
  return <BasicMap mapName="sichuan" mapJson={sichuan} style={{ width: '100%', height: 400 }} />;
};
