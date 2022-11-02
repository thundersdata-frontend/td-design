import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Radar } from '@td-design/lego';

export default () => {
  const [visible, setVisible] = useState(false);

  const seriesData = [
    {
      name: '平均情况',
      data: [51, 19, 25, 280, 47],
    },
    {
      name: '当前园区情况',
      data: [74, 28, 45, 340, 56],
    },
  ];

  const indicatorData = [
    { name: '占地面积', max: 100, unit: '亩' },
    { name: '高标库面积', max: 100, unit: '万平方米' },
    { name: '充电桩数量', max: 100, unit: '个' },
    { name: '车辆进出数量', max: 500, unit: '辆' },
    { name: '平均停留时长', max: 100, unit: '分钟' },
  ];

  return (
    <>
      <Button onClick={() => setVisible(true)}>弹窗</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={650}
        bodyStyle={{ backgroundColor: '#040727' }}
      >
        <Radar inModal style={{ height: 500 }} seriesData={seriesData} indicatorData={indicatorData} />
      </Modal>
    </>
  );
};
