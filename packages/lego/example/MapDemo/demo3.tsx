import React from 'react';
import { Map } from '@td-design/lego';

export default () => (
  <Map
    style={{ width: 486, height: 354 }}
    lineData={[
      {
        coords: [
          [119.956, 30.05],
          [116.41, 39.91],
        ],
      },
      {
        coords: [
          [119.956, 30.05],
          [110, 36.72],
        ],
      },
    ]}
    pointData={[
      {
        name: '浙江省',
        value: [119.956, 30.05],
      },
      {
        name: '山东省',
        value: [116.41, 39.91],
      },
      {
        name: '陕西省',
        value: [110, 36.72],
      },
    ]}
  />
);
