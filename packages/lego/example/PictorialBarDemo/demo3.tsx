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
    data={[2012, 3630, 3790, 1900, 4560, 7300, 5698, 6458, 7809, 9807, 10010, 8975]}
    style={{ width: 486, height: 254 }}
  />
);
