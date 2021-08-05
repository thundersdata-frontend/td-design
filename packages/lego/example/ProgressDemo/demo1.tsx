import React from 'react';
import { Progress } from '@td-design/lego';

export default () => (
  <Progress
    name="进度"
    data={[
      { name: '北京', value: 64 },
      { name: '上海', value: 78 },
      { name: '成都', value: 38 },
    ]}
    style={{ width: 374, height: 214 }}
  />
);
