import React from 'react';
import { Scatter } from '@td-design/lego';

export default () => (
  <Scatter
    unit="AQI指数"
    xAxisData={['01月', '02月', '03月', '04月', '05月', '06月']}
    seriesData={[
      {
        name: '北京',
        data: [55, 25, 56, 33, 42, 82],
      },
      {
        name: '上海',
        data: [27, 71, 74, 36, 46, 69],
      },
      {
        name: '重庆',
        data: [91, 65, 83, 109, 106, 109],
      },
    ]}
    style={{ width: 374, height: 214 }}
  />
);
