import React from 'react';
import { StackBar } from '@td-design/lego';

export default () => (
  <StackBar
    xAxisData={['01月', '02月', '03月', '04月', '05月', '06月']}
    unit="万"
    seriesData={[
      { name: '月高速车辆总数', data: [2012, 2555, 1234, 1899, 1986, 2100] },
      { name: '月空车数量', data: [1222, 1333, 899, 1234, 1500, 900] },
    ]}
    seriesColor={[
      ['#46E081', '#0DFFB7'],
      ['#3FA4FF', '#60F5FF'],
    ]}
    style={{ width: 486, height: 254 }}
  />
);
