import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { SliceBar } from '@td-design/lego';

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
        <SliceBar
          max={1000}
          unit="万元"
          xAxisData={['太原', '西安', '北京', '上海']}
          name="产值"
          data={[960, 548, 300, 300]}
          inModal
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
