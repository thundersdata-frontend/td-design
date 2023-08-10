import React from 'react';
import { DrillMap } from '@td-design/lego-map';

export default () => {
  return (
    <DrillMap enableDrill={false} style={{ width: '100%', height: 900 }} />
  );
};
