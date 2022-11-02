import React from 'react';
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
          ],
        },
      ],
    },
  },
  success: true,
};

/** 饼图 demo */
const BasePieDemo = () => (
  <BasePie
    data={result.data.data.series[0].data}
    style={{ width: 486, height: 254 }}
  />
);

export default BasePieDemo;
