import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ThreeDimensionalPie } from '@td-design/lego';

export default () => {
  const [visible, setVisible] = useState(false);

  const data = [
    { name: '木材', value: '47043' },
    { name: '机械', value: '38603' },
    { name: '钢铁', value: '31316' },
  ];

  return (
    <>
      <Button onClick={() => setVisible(true)}>弹窗</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={750}
        bodyStyle={{ backgroundColor: '#040727' }}
      >
        <ThreeDimensionalPie
          seriesData={data}
          autoLoop
          inModal
          style={{ width: 720, height: 308 }}
          imgStyle={{ top: 85, left: 168, width: 380, height: 260 }}
          barConfig={{ legend: { top: 50 } }}
        />
      </Modal>
    </>
  );
};
