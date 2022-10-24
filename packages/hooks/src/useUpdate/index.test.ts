import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';

import useMemoizedFn from '../useMemoizedFn';
import useUpdate from './index';

describe('useUpdate', () => {
  test('useUpdate should be defined', () => {
    expect(useUpdate).toBeDefined();
  });

  test('useUpdate should update', () => {
    const { result } = renderHook(() => {
      const ref = useRef(0);
      const update = useUpdate();
      return {
        update,
        count: ref.current,
        onChange: useMemoizedFn(() => {
          ref.current = ref.current + 1;
          update();
        }),
      };
    });
    expect(result.current.count).toEqual(0);

    act(result.current.onChange);

    expect(result.current.count).toEqual(1);
  });

  test('should return same update function', () => {
    const { result, rerender } = renderHook(() => useUpdate());
    const preUpdate = result.current;
    rerender();
    expect(result.current).toEqual(preUpdate);
  });
});
