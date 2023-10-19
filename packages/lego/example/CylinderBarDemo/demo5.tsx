import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CylinderBar } from '@td-design/lego';

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
        <CylinderBar
          inModal
          xAxisData={['01月', '02月']}
          seriesData={[
            { name: '月高速车辆总数', data: [2012, 555], unit: '万辆' },
            { name: '月空车数量', data: [1222, 1333], unit: '万辆' },
          ]}
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
