import { useControllableValue } from '@td-design/rn-hooks';
import React, { useState } from 'react';

const ControllableComponent = (props: any) => {
  const [state, setState] = useControllableValue<string>(props);

  return (
    <input
      value={state}
      onChange={e => {
        setState(e.target.value);
      }}
      style={{ width: 300 }}
    />
  );
};
const Parent = () => {
  const [state, setState] = useState<number>(0);

  return (
    <>
      <div style={{ marginBottom: 8 }}>state:{state}</div>
      <ControllableComponent onChange={setState} />
    </>
  );
};
export default Parent;
