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
            { name: '其它', value: '73437' },
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
    <div style={{ width: 475, height: 255 }}>
      <BasePie
          autoLoop={true}
          unit="吨"
          data={result.data.data.series[0].data}
        />
    </div>
    
  );
};

export default BasePieDemo;
