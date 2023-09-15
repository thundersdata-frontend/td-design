import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { StackBar } from '@td-design/lego';

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
        <StackBar
          inModal
          xAxisData={['01月', '02月', '03月', '04月', '05月', '06月']}
          unit="万"
          seriesData={[
            {
              name: '月高速车辆总数',
              data: [2012, 2555, 1234, 1899, 1986, 2100],
            },
            { name: '月空车数量', data: [1222, 1333, 899, 1234, 1500, 900] },
          ]}
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
