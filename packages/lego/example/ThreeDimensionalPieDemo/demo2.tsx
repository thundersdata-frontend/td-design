import React from 'react';
import { ThreeDimensionalPie } from '@td-design/lego';

export default () => {
  const data = [
    { name: '木材', value: '600' },
    { name: '机械', value: '500' },
    { name: '钢铁', value: '400' },
    { name: '铝', value: '300' },
    { name: '塑料', value: '200' },
    { name: '金', value: '100' },
  ];

  return (
    <ThreeDimensionalPie
      seriesData={data}
      style={{ width: 560, height: 218 }}
      barConfig={{ legend: { top: 50 } }}
      pieConfig={{}}
      isFlat={false}
      coefficient={2}
    />
  );
};
