import React from 'react';
import { BarLine } from '@td-design/lego';

export default () => (
  <BarLine
    xAxisData={['03月', '04月', '05月', '06月', '07月', '08月']}
    yAxis={[{ name: '万元' }, { name: '%' }]}
    lineData={{ name: '同比增长率', data: [12, 11, 19, 23, 32, 45] }}
    barData={{ name: '运费', data: [98, 112, 234, 500, 584, 666] }}
  />
);
