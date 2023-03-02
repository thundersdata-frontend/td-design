import React from 'react';
import { ImgRosePie } from '@td-design/lego';

export default () => {
  const data = [
    { name: '木材', value: '6' },
    { name: '机械', value: '4' },
    { name: '钢铁', value: '3' },
    { name: '煤炭', value: '2' },
    { name: '矿建', value: '1' },
  ];

  return (
    <div style={{ width: 260, height: 150 }}>
    <ImgRosePie
      seriesData={data}
      autoLoop={true}
    />
    </div>
  );
};
