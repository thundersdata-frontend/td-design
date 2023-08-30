import React from 'react';
import { ScrollNumber } from '@td-design/lego';

export default () => (
  <ScrollNumber
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
