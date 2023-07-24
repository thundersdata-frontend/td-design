import React, { useEffect, useRef, useState } from 'react';
import { BasePie } from '@td-design/lego';

const result = {
  code: 20000,
  data: {
    title: '货物比例',
    data: {
      series: [
        {
          name: '货物比例',
          type: 'pie',
          data: [
            { name: '木材', value: '47043' },
            { name: '机械、设备', value: '38603' },
            { name: '钢铁', value: '31316' },
            { name: '煤炭及制品', value: '29037' },
            { name: '矿建材料', value: '27474' },
            { name: '其他', value: '73437' },
          ],
        },
      ],
    },
  },
  success: true,
};

/** 饼图 demo */
const BasePieDemo = () => {
  return (
    <BasePie
      autoLoop={true}
      data={result.data.data.series[0].data}
      legendPosition="bottom"
      onlyPercentage={true}
      style={{ width: 260, height: 500 }}
    />
  );
};

export default BasePieDemo;
