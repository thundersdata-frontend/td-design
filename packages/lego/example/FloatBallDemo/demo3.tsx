import React from 'react';
import { FloatBall } from '@td-design/lego';

const dataSource = [
  {
    label: '服务站(个)',
    value: 242,
  },
  {
    label: '服务员(人)',
    value: 1430,
  },
  {
    label: '服务车(辆)',
    value: 935,
  },
  {
    label: '流程线(条)',
    value: 100,
  },
];

export default () => <FloatBall dataSource={dataSource} maxCount={3} />;
