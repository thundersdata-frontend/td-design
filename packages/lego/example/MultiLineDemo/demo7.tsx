import React, { useEffect, useState } from 'react';
import { MultiLine } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoop(false);
    }, 5000);
  })

  return (
    <MultiLine
      style={{ width: 486, height: 254 }}
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
            { name: '6月', value: '1182' },
          ],
        },
      ]}
      autoLoop={autoLoop}
    />
  );
}
