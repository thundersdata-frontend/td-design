import React from 'react';
import { ImgPie } from '@td-design/lego';

export default () => {
  const data = [
    { name: '木材', value: '47043' },
    { name: '机械、设备', value: '38603' },
    { name: '钢铁', value: '31316' },
  ];

  return <ImgPie data={data} style={{ width: 500, height: 400 }} />;
};
