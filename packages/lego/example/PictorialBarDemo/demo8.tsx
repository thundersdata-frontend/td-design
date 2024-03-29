import React from 'react';
import { PictorialBar } from '@td-design/lego';

export default () => (
  <PictorialBar
    xAxisData={['2019年', '2020年', '2021年']}
    unit="万"
    name="产值"
    data={[2012, 3620, 3790]}
    style={{ width: 486, height: 254 }}
    renderer='svg'
  />
);
