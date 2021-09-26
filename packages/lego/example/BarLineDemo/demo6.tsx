import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { BarLine } from '@td-design/lego';

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
        <BarLine
          inModal
          xAxisData={['03月', '04月']}
          yAxis={[{ name: '万元' }, { name: '%' }]}
          lineData={{ name: '同比增长率', data: [12, 11] }}
          barData={{ name: '运费', data: [500, 584] }}
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
