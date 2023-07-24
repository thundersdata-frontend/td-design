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
            { name: '其他', value: '73437' },
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
