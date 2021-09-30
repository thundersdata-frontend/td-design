import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PictorialBar } from '@td-design/lego';

export default () => {
  const [visible, setVisible] = useState(false);
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
        <PictorialBar
          xAxisData={['2019年', '2020年', '2021年']}
          unit="万"
          name="产值"
          data={[2012, 3620, 3790]}
          inModal
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
