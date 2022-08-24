import React from 'react';
import { BarLine } from '@td-design/lego';

export default () => (
  <BarLine
    xAxisData={['03月', '04月']}
    yAxis={[{ name: '万元' }, { name: '%' }]}
    lineData={{ name: '同比增长率', data: [12, 11] }}
    barData={{ name: '运费', data: [500, 584] }}
    style={{ width: 486, height: 254 }}
    shadow
  />
);
