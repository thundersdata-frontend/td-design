import React from 'react';
import { MultiLine } from '@td-design/lego';

export default () => (
  <MultiLine
    style={{ width: 486, height: 254 }}
    xAxisData={[
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ]}
    yAxis={[{ name: '万kWh' }, { name: '万次' }]}
    seriesData={[
      {
        name: '充电电量',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '174' },
          { name: '2月', value: '187' },
          { name: '3月', value: '719' },
          { name: '4月', value: '18' },
          { name: '5月', value: '784' },
          { name: '6月', value: '392' },
          { name: '7月', value: '713' },
          { name: '8月', value: '192' },
          { name: '9月', value: '184' },
          { name: '10月', value: '892' },
          { name: '11月', value: '138' },
          { name: '12月', value: '1182' },
        ],
      },
      {
        name: '充电次数',
        yAxisIndex: 1,
        data: [
          { name: '1月', value: '713' },
          { name: '2月', value: '192' },
          { name: '3月', value: '184' },
          { name: '4月', value: '892' },
          { name: '5月', value: '138' },
          { name: '6月', value: '1182' },
          { name: '7月', value: '174' },
          { name: '8月', value: '187' },
          { name: '9月', value: '719' },
          { name: '10月', value: '18' },
          { name: '11月', value: '784' },
          { name: '12月', value: '392' },
        ],
      },
    ]}
  />
);
