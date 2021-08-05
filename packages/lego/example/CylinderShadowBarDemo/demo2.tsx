import React from 'react';
import { CylinderShadowBar } from '@td-design/lego';

export default () => (
  <CylinderShadowBar
    xAxisData={['01月', '02月', '03月', '04月', '05月', '06月']}
    unit="万"
    name="月高速车辆总数"
    max={4000}
    data={[2012, 555, 2300, 899, 1589, 2500]}
    style={{ width: 486, height: 254 }}
  />
);
