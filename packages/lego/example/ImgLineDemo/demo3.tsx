import React, { useEffect, useState } from 'react';
import { ImgLine } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoop(false);
    }, 5000);
  }, [])

  return (
    <ImgLine
      img={require('../assets/line_bottom.png')}
      style={{ width: 486, height: 254 }}
      xAxisData={['1月', '2月', '3月', '4月', '5月', '6月']}
      yAxis={[{ name: '万kWh' }]}
      seriesData={[
        {
          name: '充电电量',
          yAxisIndex: 0,
          data: [174, 187, 719, 18, 784, 392],
        },
      ]}
      autoLoop={autoLoop}
    />
  );
};
