import React, { useState } from 'react';
import { HorizontalBar } from '@td-design/lego';

export default () => {
  const [autoLoop, setAutoLoop] = useState(true);
  return (
    <HorizontalBar
      unit="万元"
      max={1000}
      seriesData={{
        name: '产值',
        data: [
          {
            name: '太原',
            value: 960,
          },
          {
            name: '西安',
            value: 548.7,
          },
          {
            name: '北京',
            value: 300.2,
          },
          {
            name: '上海',
            value: 300,
          },
        ],
      }}
      style={{ width: 486, height: 254 }}
      autoLoop={autoLoop}
    />
  );
}
