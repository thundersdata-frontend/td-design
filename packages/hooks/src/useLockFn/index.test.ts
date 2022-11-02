import { act, renderHook } from '@testing-library/react-hooks';
import { useCallback, useRef, useState } from 'react';

import { sleep } from '../utils/testHelpers';
import useLockFn from './index';

describe('useLockFn', () => {
  test('useLockFn should be defined', () => {
    expect(useLockFn).toBeDefined();
  });

  const setup = () =>
    renderHook(() => {
      const [tag, setTag] = useState(false);
      const countRef = useRef(0);

      const persistFn = useCallback(
        async (step: number) => {
          countRef.current += step;
          await sleep(50);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tag] // 为了模拟tag变化引起persistFn发生变化
      );
      const lockedFn = useLockFn(persistFn);

      return {
        lockedFn,
        countRef,
        updateTag: () => setTag(true),
      };
    });

  test('useLockFn should work like a charm', async () => {
    const { result } = setup();
    const { lockedFn, countRef } = result.current;

    lockedFn(1);
    expect(countRef.current).toBe(1);

    lockedFn(2);
    expect(countRef.current).toBe(1);

    await sleep(30);
    lockedFn(3);
    expect(countRef.current).toBe(1);

    await sleep(50);
    lockedFn(4);
    expect(countRef.current).toBe(5);

    lockedFn(5);
    expect(countRef.current).toBe(5);
  });

  test('lockedFn should be the same', () => {
    const { result, rerender } = setup();
    const prevLockedFn = result.current.lockedFn;

    rerender();
    expect(result.current.lockedFn).toEqual(prevLockedFn);

    act(() => {
      result.current.updateTag(); // 更新之后tag发生变化，导致persistFn发生变化，从而lockedFn发生变化
    });
    expect(result.current.lockedFn).not.toEqual(prevLockedFn);
  });
});
