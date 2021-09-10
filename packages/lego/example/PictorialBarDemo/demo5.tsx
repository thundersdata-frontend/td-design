import React, { useState, useEffect } from 'react';
import { PictorialBar } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoop(false);
    }, 5000);
  }, [])

  return (
    <PictorialBar
      xAxisData={['2019年', '2020年', '2021年']}
      unit="万"
      name="产值"
      data={[2012, 3620, 3790]}
      style={{ width: 486, height: 254 }}
      autoLoop={autoLoop}
    />
  );
}
