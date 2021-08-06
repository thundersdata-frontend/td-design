import React from 'react';
import { Gauge } from '@td-design/lego';

export default () => (
  <Gauge
    style={{ width: 407, height: 351 }}
    imgStyle={{ width: '310px', height: '235px', left: '50px', top: '25px' }}
    min={0}
    max={100}
    value={40}
  />
);
