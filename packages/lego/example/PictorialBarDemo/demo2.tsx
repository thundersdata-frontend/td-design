import React from 'react';
import { PictorialBar } from '@td-design/lego';

export default () => (
  <PictorialBar
    xAxisData={['2009年', '2010年', '2011年', '2012年', '2013年', '2014年']}
    unit="万"
    data={[2012, 3630, 3790, 1900, 4560, 7300]}
    style={{ width: 486, height: 254 }}
  />
);
