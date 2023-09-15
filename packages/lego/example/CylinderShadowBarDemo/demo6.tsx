import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CylinderShadowBar } from '@td-design/lego';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>弹窗</Button>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={650}
        bodyStyle={{ backgroundColor: '#040727' }}
      >
        <CylinderShadowBar
          inModal
          xAxisData={['01月', '02月']}
          unit="万"
          name="月高速车辆总数"
          max={2500}
          data={[2012, 555]}
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
