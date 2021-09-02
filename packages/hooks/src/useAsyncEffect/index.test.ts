import { useState } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useAsyncEffect from './index';
import { sleep } from '../utils/testHelpers';

describe('useAsyncEffect', () => {
  test('useAsyncEffect should be defined', () => {
    expect(useAsyncEffect).toBeDefined();
  });

  test('should work without cleanup', async () => {
    const { result, waitForNextUpdate } = renderHook(() => {
      const [count, setCount] = useState(0);

      useAsyncEffect(async () => {
        await sleep(100);
        setCount(1);
      }, []);
      return count;
    });

    expect(result.current).toBe(0);

    await waitForNextUpdate();

    expect(result.current).toBe(1);
  });
});
