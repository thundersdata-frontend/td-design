import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CircularSolidPie } from '@td-design/lego';

export default () => {
  const [visible, setVisible] = useState(false);

  const data = [
    { name: '木材', value: '47043' },
    { name: '机械', value: '38603' },
    { name: '钢铁', value: '31316' },
    { name: '煤烟', value: '31316' },
  ];

  return (
    <>
      <Button onClick={() => setVisible(true)}>弹窗</Button>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={650}
        bodyStyle={{ backgroundColor: '#040727' }}
        getContainer={false} // <- 这个属性如果不加，那第一次打开的时候，里面的echarts图表不能正常渲染
      >
        <CircularSolidPie
          data={data}
          autoLoop
          inModal
          style={{ width: 600, height: 380 }}
          imgStyle={{ width: 470, height: 365 }}
        />
      </Modal>
    </>
  );
};
