import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import useDeepCompareEffect from './index';

describe('useDeepCompareEffect', () => {
  test('useDeepCompareEffect should be defined', () => {
    expect(useDeepCompareEffect).toBeDefined();
  });

  test('useDeepCompareEffect should work like a charm', () => {
    const { result } = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({});

      useDeepCompareEffect(() => {
        setX(x => x + 1);
      }, [y]);

      return { x, setY };
    });

    expect(result.current.x).toBe(1);

    act(() => {
      result.current.setY({}); // 对象的深比较会失败，所以 setX 不会执行
    });
    expect(result.current.x).toBe(1);
  });
});
