import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { TextScroll } from '@td-design/lego';

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
        bodyStyle={{ backgroundColor: '#040727'}}
      >
        <TextScroll
          inModal
          contentStyle={{ height: 147 }}
          texts={[
            '雷数科技竭力为客户提供贯穿整个设备生命周期的全方位服务，经过十几年变迁与发展，销售累计突破百亿。雷数科技竭力为客户提供贯穿整个设备生命周期的全方位服务，经过十几年变迁与发展，销售累计突破百亿。雷数科技竭力为客户提供贯穿整个设备生命周期的全方位服务，经过十几年变迁与发展，销售累计突破百亿。雷数科技竭力为客户提供贯穿整个设备生命周期的全方位服务，经过十几年变迁与发展，销售累计突破百亿。',
            '今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦今天是个好日子哦',
            '明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦明天是个好日子哦',
          ]}
        />
      </Modal>
    </>
  );
};
