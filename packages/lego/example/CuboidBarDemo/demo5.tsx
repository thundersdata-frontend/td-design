import React, { useEffect, useState } from 'react';
import { CuboidBar } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoop(false);
    }, 5000);
  }, []);

  return (
    <CuboidBar
      xAxisData={['01月', '02月', '03月']}
      unit="万"
      name="产值"
      data={[2012, 1230, 3790]}
      style={{ width: 486, height: 254 }}
      autoLoop={autoLoop}
    />
  );
};
