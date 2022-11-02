import { useTimeout } from '@td-design/rn-hooks';
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState(1);
  useTimeout(() => {
    setState(state + 1);
  }, 3000);

  return <div>{state}</div>;
};
