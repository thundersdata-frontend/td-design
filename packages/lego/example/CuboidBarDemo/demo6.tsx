import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CuboidBar } from '@td-design/lego';

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
        <CuboidBar
          inModal
          xAxisData={['01月', '02月', '03月']}
          unit="万"
          name="产值"
          data={[2012, 1230, 3790]}
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
