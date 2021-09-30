import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Radar } from '@td-design/lego';

export default () => {
  const [visible, setVisible] = useState(false);

  const seriesData = [
    {
      name: '平均情况',
      data: [
        { name: '占地面积', value: '51', unit: '亩' },
        { name: '高标库面积', value: '19', unit: '万平方米' },
        { name: '充电桩数量', value: '25', unit: '个' },
        { name: '车辆进出数量', value: '280', unit: '辆' },
        { name: '平均停留时长', value: '47', unit: '分钟' },
      ],
    },
    {
      name: '当前园区情况',
      data: [
        { name: '占地面积', value: '74.3', unit: '亩' },
        { name: '高标库面积', value: '8.2', unit: '万平方米' },
        { name: '充电桩数量', value: '45.1', unit: '个' },
        { name: '车辆进出数量', value: '341.2', unit: '辆' },
        { name: '平均停留时长', value: '56', unit: '分钟' },
      ],
    },
  ];

  const indicatorData = seriesData?.[0]?.data?.map((item: any) => ({
    name: item.name,
    max: +item.value,
    unit: item.unit,
  }));
  seriesData?.[1]?.data?.forEach((item: any, index) => {
    if (item.value > indicatorData[index].max) {
      indicatorData[index].max = +(item.value * 1.2).toFixed(2);
    } else {
      indicatorData[index].max = +(indicatorData[index].max * 1.2).toFixed(2);
    }
  });

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
        <Radar inModal style={{ height: 500 }} seriesData={seriesData} indicatorData={indicatorData} />
      </Modal>
    </>
  );
};
