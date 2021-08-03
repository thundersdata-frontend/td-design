import React from 'react';
import { CuboidBar } from '@td-design/lego';

export default () => (
  <CuboidBar
    xAxisData={[
      '德州',
      '德城区',
      '陵城区',
      '禹城市',
      '乐陵市',
      '临邑县',
      '平原县',
      '夏津县',
      '武城县',
      '庆云县',
      '宁津县',
      '齐河县',
    ]}
    unit="万"
    name="产值"
    data={[2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654]}
  />
);
