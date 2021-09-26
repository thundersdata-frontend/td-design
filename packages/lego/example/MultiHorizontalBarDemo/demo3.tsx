import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { MultiHorizontalBar } from '@td-design/lego';

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
        <MultiHorizontalBar
          unit={['万元', '万元']}
          max={[1000, 1000]}
          leftData={{
            name: '充电',
            data: [
              {
                name: '尖',
                value: 960,
              },
              {
                name: '峰',
                value: 548.7,
              },
              {
                name: '平',
                value: 300.2,
              },
              {
                name: '谷',
                value: 300,
              },
            ],
          }}
          rightData={{
            name: '放电',
            data: [
              {
                name: '尖',
                value: 960,
              },
              {
                name: '峰',
                value: 548.7,
              },
              {
                name: '平',
                value: 300.2,
              },
              {
                name: '谷',
                value: 300,
              },
            ],
          }}
          inModal
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
