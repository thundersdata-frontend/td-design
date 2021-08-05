import React from 'react';
import { ImgPie } from '@td-design/lego';

export default () => {
  const data = [
    { name: '木材', value: '47043' },
    { name: '机械、设备', value: '38603' },
    { name: '钢铁', value: '31316' },
  ];

  const total = Math.round(
    data
      .map((item: { value: string; name: string }) => +item.value)
      .reduce((value: number, total: number) => {
        return value + total;
      }, 0)
  );

  const gapValue = Number(total) * 0.01;

  const newData: any[] = [];
  if (data.length == 1) {
    newData.push(data[0]);
  } else {
    data.forEach(ele => {
      newData.push(
        {
          value: +ele.value,
          name: ele.name,
          percent: (+ele.value / total) * 100,
        },
        {
          value: gapValue,
          name: '',
          itemStyle: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0,
          },
        }
      );
    });
  }
  return <ImgPie seriesData={newData} style={{ width: 407, height: 351 }} />;
};
