import React from 'react';
import { MultiHorizontalBar } from '@td-design/lego';

export default () => (
  <MultiHorizontalBar
    unit={['万元', '万元']}
    max={[1000, 1000]}
    leftData={{
      name: '充电',
      data: [
        {
          name: '尖',
          value: 960,
        },
        {
          name: '峰',
          value: 548.7,
        },
        {
          name: '平',
          value: 300.2,
        },
        {
          name: '谷',
          value: 300,
        },
      ],
    }}
    rightData={{
      name: '放电',
      data: [
        {
          name: '尖',
          value: 960,
        },
        {
          name: '峰',
          value: 548.7,
        },
        {
          name: '平',
          value: 300.2,
        },
        {
          name: '谷',
          value: 300,
        },
      ],
    }}
    style={{ width: 486, height: 254 }}
  />
);
