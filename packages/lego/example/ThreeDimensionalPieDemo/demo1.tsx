import React from 'react';
import { ThreeDimensionalPie } from '@td-design/lego';

export default () => {
  const data = [
    { name: '木材', value: '47043' },
    { name: '机械', value: '38603' },
    { name: '钢铁', value: '31316' },
  ];

  return (
    <ThreeDimensionalPie
      seriesData={data}
      autoLoop
      style={{ width: 560, height: 218 }}
      barProps={{ legend: { top: 50 } }}
      pieProps={{}}
    />
  );
};
