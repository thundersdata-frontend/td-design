import React from 'react';
import { BarLine } from '@td-design/lego';

export default () => (
  <BarLine
    xAxisData={['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']}
    yAxis={[{ name: '万元' }, { name: '%' }]}
    lineData={{ name: '同比增长率', data: [12, 11, 19, 23, 32, 23, 45, 89, 22, 38, 65, 88] }}
    barData={{ name: '运费', data: [98, 112, 234, 500, 584, 213, 334, 445, 556, 667, 778, 889] }}
  />
);
