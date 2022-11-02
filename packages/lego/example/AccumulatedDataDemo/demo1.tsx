import { AccumulatedData } from '@td-design/lego';

export default function () {
  return (
    <AccumulatedData
      data={[
        { name: '承运车辆数', value: 36.8, unit: '万辆' },
        { name: '累计订单', value: 168.5, unit: '万单' },
        { name: '运费', value: 41.5, unit: '万' },
        { name: '光伏发电量', value: 3346.8, unit: '万度' },
        { name: '换电站数量', value: 4, unit: '个' },
      ]}
    />
  );
}
