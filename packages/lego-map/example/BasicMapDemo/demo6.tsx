import { BasicMap } from '@td-design/lego-map';
import { Select } from 'antd';
import { useState } from 'react';
import sichuan from './sichuan.json';

export default () => {
  const [mapName, setMapName] = useState('china');

  return (
    <div>
      <Select value={mapName} onChange={setMapName} style={{ width: 100 }}>
        <Select.Option key="china">全国</Select.Option>
        <Select.Option key="sichuan">四川</Select.Option>
      </Select>
      <BasicMap
        mapName={mapName}
        mapJson={mapName === 'sichuan' ? sichuan : undefined}
        style={{ width: '100%', height: 900 }}
      />
    </div>
  );
};
