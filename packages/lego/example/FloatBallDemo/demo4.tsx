import React from 'react';
import { FloatBall } from '@td-design/lego';

const dataSource = [
  {
    element: (
      <>
        <div className="td-lego-float-ball-value">242</div>
        <div className="td-lego-float-ball-label">服务站(个)</div>
      </>
    ),
  },
  {
    element: (
      <>
        <div className="td-lego-float-ball-label">自定义</div>
      </>
    ),
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
