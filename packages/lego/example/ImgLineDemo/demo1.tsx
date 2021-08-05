import React from 'react';
import { ImgLine } from '@td-design/lego';

export default () => (
  <ImgLine
    img={require('../assets/line_bottom.png')}
    style={{ width: 486, height: 254 }}
    xAxisData={['1月', '2月', '3月', '4月', '5月', '6月']}
    yAxis={[{ name: '万kWh' }]}
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
    ]}
  />
);
