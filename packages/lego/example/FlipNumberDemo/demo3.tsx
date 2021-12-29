import React from 'react';
import { FlipNumber } from '@td-design/lego';

export default () => (
  <FlipNumber
    start={0}
    end={10000000}
    separator=","
    style={{
      color: '#8dceff',
      fontWeight: 'bold',
      fontSize: '28px',
    }}
  />
);
