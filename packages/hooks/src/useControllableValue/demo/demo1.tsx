import React from 'react';
import { useControllableValue } from '@td-design/rn-hooks';

export default (props: any) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '',
  });

  return (
    <>
      <input value={state} onChange={e => setState(e.target.value)} style={{ width: 300 }} />
      <button type="button" onClick={() => setState('')} style={{ margin: '0 4px' }}>
        Clear
      </button>
    </>
  );
};
