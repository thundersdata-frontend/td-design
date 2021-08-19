import React from 'react';
import { MultiLine } from '@td-design/lego';

export default () => (
  <MultiLine
    style={{ width: 686, height: 254 }}
    xAxisData={['1月', '2月', '3月', '4月', '5月', '6月']}
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
          { name: '6月', value: '202' },
        ],
      },
      {
        name: '充电电量1',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '1713' },
          { name: '2月', value: '1192' },
          { name: '3月', value: '1184' },
          { name: '4月', value: '1892' },
          { name: '5月', value: '1138' },
          { name: '6月', value: '482' },
        ],
      },
      {
        name: '充电电量2',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '173' },
          { name: '2月', value: '119' },
          { name: '3月', value: '114' },
          { name: '4月', value: '892' },
          { name: '5月', value: '1238' },
          { name: '6月', value: '182' },
        ],
      },
      {
        name: '充电电量3',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '1213' },
          { name: '2月', value: '1122' },
          { name: '3月', value: '1184' },
          { name: '4月', value: '192' },
          { name: '5月', value: '1138' },
          { name: '6月', value: '382' },
        ],
      },
      {
        name: '充电电量4',
        yAxisIndex: 0,
        data: [
          { name: '1月', value: '713' },
          { name: '2月', value: '1192' },
          { name: '3月', value: '584' },
          { name: '4月', value: '1892' },
          { name: '5月', value: '938' },
          { name: '6月', value: '82' },
        ],
      },
    ]}
  />
);
