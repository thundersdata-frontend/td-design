import { BasicMap } from '@td-design/lego-map';
import sichuan from './sichuan.json';

export default () => {
  return (
    <BasicMap
      mapName="sichuan"
      mapJson={sichuan}
      showLabel={false}
      style={{ width: '100%', height: 400 }}
      top={40}
    />
  );
};
