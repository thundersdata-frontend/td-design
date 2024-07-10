import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Progress } from '@td-design/lego';

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
        <Progress
          name="进度"
          data={[
            { name: '北京', value: 64 },
            { name: '上海', value: 78 },
            { name: '成都', value: 38 },
          ]}
          mode="normal"
          inModal
        />
      </Modal>
    </>
  );
};
