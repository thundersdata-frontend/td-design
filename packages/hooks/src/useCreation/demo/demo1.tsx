import { useCreation } from '@td-design/rn-hooks';
import React, { useState } from 'react';

class Foo {
  constructor() {
    this.data = Math.random();
  }

  data: number;
}

export default function () {
  const foo = useCreation(() => new Foo(), []);
  const [, setFlag] = useState({});
  return (
    <>
      <p>{foo.data}</p>
      <button
        type="button"
        onClick={() => {
          setFlag({});
        }}
      >
        Rerender
      </button>
    </>
  );
}
