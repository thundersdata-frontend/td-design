import React, { useState } from 'react';
import { useControllableValue } from '@td-design/rn-hooks';

const ControllableComponent = (props: any) => {
  const [state, setState] = useControllableValue<string>(props);

  return <input value={state} onChange={e => setState(e.target.value)} style={{ width: 300 }} />;
};

const Parent = () => {
  const [state, setState] = useState<string>('');
  const clear = () => {
    setState('');
  };

  return (
    <>
      <ControllableComponent value={state} onChange={setState} />
      <button type="button" onClick={clear} style={{ margin: '0 4px' }}>
        Clear
      </button>
    </>
  );
};
export default Parent;
