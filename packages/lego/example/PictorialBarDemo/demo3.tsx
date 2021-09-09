import React from 'react';
import { PictorialBar } from '@td-design/lego';

export default () => (
  <PictorialBar
    xAxisData={[
      '2009年',
      '2010年',
      '2011年',
      '2012年',
      '2013年',
      '2014年',
      '2015年',
      '2016年',
      '2017年',
      '2018年',
      '2019年',
      '2020年',
    ]}
    unit="万"
    name="产值"
    data={[
      { name: '2009年', value: 2012, unit: '万' },
      { name: '2010年', value: 3620, unit: '万' },
      { name: '2011年', value: 3790, unit: '万' },
      { name: '2012年', value: 1900, unit: '万' },
      { name: '2013年', value: 4560, unit: '万' },
      { name: '2014年', value: 7300, unit: '万' },
      { name: '2015年', value: 5678, unit: '万' },
      { name: '2016年', value: 8976, unit: '万' },
      { name: '2017年', value: 3790, unit: '万' },
      { name: '2018年', value: 4536, unit: '万' },
      { name: '2019年', value: 9076, unit: '万' },
      { name: '2020年', value: 1289, unit: '万' },
    ]}
    style={{ width: 486, height: 254 }}
  />
);
