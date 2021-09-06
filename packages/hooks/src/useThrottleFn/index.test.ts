import { renderHook, act } from '@testing-library/react-hooks';
import { sleep } from '../utils/testHelpers';
import useThrottleFn from './index';

describe('useThrottleFn', () => {
  test('useThrottleFn should be defined', () => {
    expect(useThrottleFn).toBeDefined();
  });

  test('useThrottleFn parameter should be function', () => {
    const { result } = renderHook(() => useThrottleFn(12 as any, { wait: 200 }));
    expect(result.error).toBeDefined();
  });

  test('useThrottleFn.run should work like a charm', async () => {
    let count = 0;
    const throttleFn = (delta = 1) => {
      count += delta;
    };
    const { result } = renderHook(() => useThrottleFn(throttleFn, { wait: 300 }));

    await act(async () => {
      result.current.run(1);
      expect(count).toBe(1);

      result.current.run(1);
      result.current.run(1);
      result.current.run(1);
      expect(count).toBe(1);

      await sleep(100); // t = 100
      expect(count).toBe(1);

      await sleep(150); // t = 250
      expect(count).toBe(1);

      await sleep(100); // t = 350
      expect(count).toBe(2);

      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
      await sleep(200); // t = 550
      expect(count).toBe(4);
    });
  });

  test('useThrottleFn.cancel should work like a charm', async () => {
    let count = 0;
    const throttleFn = (delta = 1) => {
      count += delta;
    };
    const { result } = renderHook(() => useThrottleFn(throttleFn, { wait: 300 }));

    await act(async () => {
      result.current.run(1);
      expect(count).toBe(1);

      result.current.run(1);
      result.current.run(1);
      result.current.run(1);
      expect(count).toBe(1);

      await sleep(100); // t = 100
      expect(count).toBe(1);

      await sleep(150); // t = 250
      result.current.run(1);
      expect(count).toBe(1);

      await sleep(100); // t = 350
      result.current.run(1);
      expect(count).toBe(2);

      await sleep(100); // t = 450
      result.current.run(2);
      result.current.cancel();
      expect(count).toBe(2);
    });
  });

  test('useThrottleFn.flush should work like a charm', async () => {
    let count = 0;
    const throttleFn = (delta = 1) => {
      count += delta;
    };
    const { result } = renderHook(() => useThrottleFn(throttleFn, { wait: 300 }));

    await act(async () => {
      result.current.run(1);
      expect(count).toBe(1);

      result.current.run(1);
      result.current.run(1);
      result.current.run(1);
      expect(count).toBe(1);

      await sleep(100); // t = 100
      expect(count).toBe(1);

      await sleep(150); // t = 250
      result.current.run(1);
      expect(count).toBe(1);

      await sleep(100); // t = 350
      result.current.run(1);
      expect(count).toBe(2);

      await sleep(100); // t = 450
      result.current.run(2);
      result.current.flush();
      expect(count).toBe(4);
    });
  });
});
