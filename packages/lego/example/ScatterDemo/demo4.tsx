import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Scatter } from '@td-design/lego';

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
        bodyStyle={{ backgroundColor: '#040727' }}
      >
        <Scatter
          unit="AQI指数"
          xAxisData={['01月', '02月', '03月', '04月', '05月', '06月']}
          seriesData={[
            {
              name: '北京',
              data: [55, 25, 56, 33, 42, 82],
            },
            {
              name: '上海',
              data: [27, 71, 74, 36, 46, 69],
            },
            {
              name: '重庆',
              data: [91, 65, 83, 109, 106, 109],
            },
          ]}
          inModal
          style={{ height: 500 }}
        />
      </Modal>
    </>
  );
};
