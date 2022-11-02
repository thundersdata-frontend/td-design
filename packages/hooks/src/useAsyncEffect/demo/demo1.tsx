import { useAsyncEffect } from '@td-design/rn-hooks';
import React, { useState } from 'react';

function mockCheck(): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

export default () => {
  const [pass, setPass] = useState<boolean>();

  useAsyncEffect(async () => {
    setPass(await mockCheck());
  }, []);

  return (
    <div>
      <button disabled={!pass}>Submit</button>
      <p>
        {pass === null && 'Checking...'}
        {pass === true && 'Check passed.'}
      </p>
    </div>
  );
};
