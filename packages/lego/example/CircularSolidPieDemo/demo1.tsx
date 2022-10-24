import React from 'react';
import { CircularSolidPie } from '@td-design/lego';

export default () => {
  const data = [
    { name: '木材', value: '47043' },
    { name: '机械', value: '38603' },
    { name: '钢铁', value: '31316' },
    { name: '煤烟', value: '31316' },
    { name: '木材1', value: '47043' },
    { name: '机械2', value: '38603' },
    { name: '钢铁3', value: '31316' },
    { name: '煤烟4', value: '31316' },
    { name: '木材5', value: '47043' },
    { name: '机械6', value: '38603' },
    { name: '钢铁7', value: '31316' },
    { name: '煤烟8', value: '31316' },
  ];

  return (
    <CircularSolidPie
      data={data}
      style={{ width: 500, height: 500 }}
      autoLoop
    />
  );
};
