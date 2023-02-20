import React, { useState } from 'react';

import { useLockFn } from '@td-design/rn-hooks';
import { message } from 'antd';

function mockApiRequest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export default () => {
  const [count, setCount] = useState(0);

  const submit = useLockFn(async () => {
    message.info('Start to submit');
    await mockApiRequest();
    setCount(val => val + 1);
    message.success('Submit finished');
  });

  return (
    <>
      <p>Submit count: {count}</p>
      <button onClick={submit}>Submit</button>
    </>
  );
};
