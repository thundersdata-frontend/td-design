import React, { useEffect, useState } from 'react';
import { BarLine } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoop(false)
    }, 5000);
  }, []);

  return (
    <BarLine
      xAxisData={['03月', '04月']}
      yAxis={[{ name: '万元' }, { name: '%' }]}
      lineData={{ name: '同比增长率', data: [12, 11] }}
      barData={{ name: '运费', data: [500, 584] }}
      autoLoop={autoLoop}
      style={{ width: 486, height: 254 }}
    />
  )
};
