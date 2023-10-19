import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { HorizontalBar } from '@td-design/lego';

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
        getContainer={false} // <- 这个属性如果不加，那第一次打开的时候，里面的echarts图表不能正常渲染
      >
        <HorizontalBar
          unit="万元"
          max={1000}
          seriesData={{
            name: '产值',
            data: [
              {
                name: '太原',
                value: 960,
              },
              {
                name: '西安',
                value: 548.7,
              },
              {
                name: '北京',
                value: 300.2,
              },
              {
                name: '上海',
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
