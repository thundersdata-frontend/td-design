import React from 'react';
import { CylinderBar } from '@td-design/lego';
import { useState } from 'react';
import { Button } from 'antd';

export default () => {
  const [unit, setUnit] = useState('');
  return (
    <div>
      <Button onClick={() => setUnit('辆')}>辆</Button>
      <Button onClick={() => setUnit('万辆')}>万辆</Button>
      <CylinderBar
        xAxisData={['01月', '02月']}
        seriesData={[
          { name: '月高速车辆总数', data: [2012, 555], unit: '万辆' },
          { name: '月空车数量', data: [1222, 1333], unit },
        ]}
        style={{ width: 486, height: 254 }}
        renderer='svg'
      />
    </div>
  );
};
