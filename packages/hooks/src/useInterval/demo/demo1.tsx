import { useInterval } from '@td-design/rn-hooks';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <div>count: {count}</div>;
};
