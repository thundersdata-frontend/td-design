import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useCreation from './index';

describe('useCreation', () => {
  test('useCreation should be defined', () => {
    expect(useCreation).toBeDefined();
  });

  class Foo {
    data: number;

    constructor() {
      this.data = Math.random();
    }
  }

  const hook = () =>
    renderHook(() => {
      const [count, setCount] = useState(0);
      const [, setFlag] = useState({});
      const foo = useCreation(() => new Foo(), [count]); // count发生变化之后返回的foo和之前的不是同一个
      return {
        foo,
        count,
        setCount,
        setFlag,
      };
    });

  test('useCreation should work like a charm', () => {
    const { result } = hook();
    const foo = result.current.foo;

    act(() => {
      result.current.setFlag({});
    });

    expect(result.current.foo).toBe(foo);

    act(() => {
      result.current.setCount(1);
    });

    expect(result.current.foo).not.toBe(foo);
  });
});
