import React from 'react';
import { CylinderShadowBar } from '@td-design/lego';

export default () => (
  <CylinderShadowBar
    xAxisData={['01月', '02月']}
    unit="万"
    name="月高速车辆总数"
    max={2500}
    data={[2012, 555]}
    style={{ width: 486, height: 254 }}
    renderer='svg'
  />
);
