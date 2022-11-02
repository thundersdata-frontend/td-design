/**
 * title: Basic usage
 * desc: Execute after 2000ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在 2000ms 后执行。
 */
import { useRafTimeout } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useRafTimeout(() => {
    setCount(count + 1);
  }, 2000);

  return <div>count: {count}</div>;
};
