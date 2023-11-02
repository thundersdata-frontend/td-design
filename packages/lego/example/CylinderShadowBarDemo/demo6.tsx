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
        getContainer={false} // <- 这个属性如果不加，那第一次打开的时候，里面的echarts图表不能正常渲染
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
