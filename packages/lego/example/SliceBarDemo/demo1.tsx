import React from 'react';
import { SliceBar } from '@td-design/lego';

export default () => (
  <SliceBar
    max={1000}
    unit="万元"
    xAxisData={['太原', '西安', '北京', '上海']}
    seriesData={{
      name: '产值',
      data: [
        {
          name: '太原',
          value: 960,
        },
        {
          name: '西安',
          value: 548.7,
        },
        {
          name: '北京',
          value: 300.2,
        },
        {
          name: '上海',
          value: 300,
        },
      ],
    }}
    style={{ width: 486, height: 254 }}
  />
);
