import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ImgLine } from '@td-design/lego';

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
        <ImgLine
          inModal
          img={require('../assets/line_bottom.png')}
          style={{ height: 500 }}
          xAxisData={['1月', '2月', '3月', '4月', '5月', '6月']}
          yAxis={[{ name: '万kWh' }]}
          seriesData={[
            {
              name: '充电电量',
              yAxisIndex: 0,
              data: [174, 187, 719, 18, 784, 392],
            },
          ]}
        />
      </Modal>
    </>
  );
};
