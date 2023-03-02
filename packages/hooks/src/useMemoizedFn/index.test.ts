import { useState } from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import useMemoizedFn from './index';

const useCount = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(c => c + 1);
  };

  const memoizedFn = useMemoizedFn(() => count);

  return {
    addCount,
    memoizedFn,
  };
};

describe('useMemoizedFn', () => {
  test('useMemoizedFn should be defined', () => {
    expect(useMemoizedFn).toBeDefined();
  });

  test('useMemoizedFn should work like a charm', () => {
    const { result } = renderHook(() => useCount());
    // 在useCount重新渲染之前先存下来，用于后面比较引用地址是否一致
    const prevMemoizedFn = result.current.memoizedFn;

    // 修改state的操作要放在act中执行
    act(() => {
      result.current.addCount();
    });

    // 比较 rerender 前后 memoizedFn 的地址是否发生变化
    expect(prevMemoizedFn).toEqual(result.current.memoizedFn);
    expect(result.current.memoizedFn()).toEqual(1);
  });
});
