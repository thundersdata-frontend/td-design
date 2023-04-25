import React from 'react';
import { SliceBar } from '@td-design/lego';

export default () => (
  <SliceBar
    max={1000}
    unit="万元"
    xAxisData={['太原', '西安', '北京', '上海']}
    name="产值"
    data={[960, 548, 300, 300]}
    style={{ width: 486, height: 254 }}
    renderer='svg'
  />
);
