import React from 'react';
import { MultiHorizontalBar } from '@td-design/lego';

export default () => (
  <MultiHorizontalBar
    max={1000}
    leftData={{
      name: '充电',
      data: [
        {
          name: '哈萨克斯坦',
          value: 960,
        },
        {
          name: '吉尔吉斯斯坦',
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
    rightData={{
      name: '放电',
      data: [
        {
          name: '哈萨克斯坦',
          value: 960,
        },
        {
          name: '吉尔吉斯斯坦',
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
      grid: [
        {
          show: false,
          left: '7%',
          top: '5%',
          bottom: '10%',
          width: '31%',
        },
        {
          show: false,
          left: '45%',
          top: '5%',
          bottom: '10%',
          width: '0%',
        },
        {
          show: false,
          right: '7%',
          top: '5%',
          bottom: '10%',
          width: '31%',
        },
      ],
    }}
  />
);
