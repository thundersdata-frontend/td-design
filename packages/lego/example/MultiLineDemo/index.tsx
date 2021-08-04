import React from 'react';
import { MultiLine } from '@td-design/lego';

export default () => (
  <MultiLine
    xAxisData={['1月', '2月', '3月', '4月', '5月', '6月']}
    yAxis={[{ name: 'kWh' }, { name: '次' }]}
    seriesData={[
      {
        name: '充电电量',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '1719384' },
          { name: '2月', value: '1898792' },
          { name: '3月', value: '719384' },
          { name: '4月', value: '1898792' },
          { name: '5月', value: '1719384' },
          { name: '6月', value: '1898792' },
        ],
      },
      {
        name: '充电次数',
        yAxisIndex: 1,
        data: [
          { name: '1月', value: '7193' },
          { name: '2月', value: '18992' },
          { name: '3月', value: '17384' },
          { name: '4月', value: '1892' },
          { name: '5月', value: '19384' },
          { name: '6月', value: '18982' },
        ],
      },
    ]}
  />
);
