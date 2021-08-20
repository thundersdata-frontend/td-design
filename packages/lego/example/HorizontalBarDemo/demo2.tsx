import React from 'react';
import { HorizontalBar } from '@td-design/lego';

export default () => (
  <HorizontalBar
    unit="万元"
    max={1000}
    seriesData={{
      name: '产值',
      data: [
        {
          name: '吉尔吉斯斯坦',
          value: 960,
        },
        {
          name: '哈萨克斯坦',
          value: 548.7,
        },
        {
          name: '阿富汗斯坦',
          value: 300.2,
        },
        {
          name: '伊拉克斯坦',
          value: 300,
        },
      ],
    }}
    style={{ width: 486, height: 254 }}
    config={{
      grid: {
        left: '20%',
        right: '10%',
      },
    }}
  />
);
