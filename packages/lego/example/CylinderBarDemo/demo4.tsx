import React, { useEffect, useState } from 'react';
import { CylinderBar } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoop(false);
    }, 5000);
  }, []);

  return (
    <CylinderBar
      xAxisData={['01月', '02月']}
      seriesData={[
        { name: '月高速车辆总数', data: [2012, 555], unit: '万辆' },
        { name: '月空车数量', data: [1222, 1333], unit: '万辆' },
      ]}
      style={{ width: 486, height: 254 }}
      autoLoop={autoLoop}
    />
  );
};
