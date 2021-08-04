import React from 'react';
import { MultiLine } from '@td-design/lego';

export default () => (
  <MultiLine
    style={{ width: 486, height: 254 }}
    xAxisData={['1月', '2月', '3月']}
    yAxis={[{ name: '万kWh' }, { name: '万次' }]}
    seriesData={[
      {
        name: '充电电量',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '174' },
          { name: '2月', value: '187' },
          { name: '3月', value: '719' },
        ],
      },
      {
        name: '充电次数',
        yAxisIndex: 1,
        data: [
          { name: '1月', value: '713' },
          { name: '2月', value: '112' },
          { name: '3月', value: '184' },
        ],
      },
    ]}
  />
);
