import React from 'react';
import { CuboidBar } from '@td-design/lego';

export default () => (
  <CuboidBar
    xAxisData={[
      '01月',
      '02月',
      '03月',
      '04月',
      '05月',
      '06月',
      '07月',
      '08月',
      '09月',
      '10月',
      '11月',
      '12月',
    ]}
    unit="万"
    name="产值"
    data={[
      2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654,
    ]}
    style={{ width: 486, height: 254 }}
  />
);
