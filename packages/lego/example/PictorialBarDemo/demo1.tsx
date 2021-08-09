import React from 'react';
import { PictorialBar } from '@td-design/lego';

export default () => (
  <PictorialBar
    xAxisData={['2019年', '2020年', '2021年']}
    unit="万"
    seriesData={{
      name: '产值',
      data: [
        { name: '2019年', value: 2012, unit: '万' },
        { name: '2020年', value: 3620, unit: '万' },
        { name: '2021年', value: 3790, unit: '万' },
      ],
    }}
    style={{ width: 486, height: 254 }}
  />
);
