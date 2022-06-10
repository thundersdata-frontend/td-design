import { SimpleMap } from '@td-design/lego-map';
import sichuan from './sichuan.json';

export default () => {
  return <SimpleMap mapName="sichuan" mapJson={sichuan} silent style={{ width: '100%', height: 400 }} />;
};
