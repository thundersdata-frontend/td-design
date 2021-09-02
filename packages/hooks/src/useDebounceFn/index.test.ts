import { renderHook, act } from '@testing-library/react-hooks';
import { sleep } from '../utils/testHelpers';
import useDebounceFn from './index';

describe('useDebounceFn', () => {
  test('useDebounceFn should be defined', () => {
    expect(useDebounceFn).toBeDefined();
  });

  test('debounce.run should work like a charm', async () => {
    let count = 0;
    function debounceFn(delta: number) {
      count += delta;
    }
    const { result } = renderHook(() => useDebounceFn(debounceFn, { wait: 200 }));

    act(() => {
      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
    });
    expect(count).toBe(0);

    await sleep(300);

    expect(count).toBe(2);

    act(() => {
      result.current.run(4);
    });
    expect(count).toBe(2);
    await sleep(300);
    expect(count).toBe(6);
  });

  test('debounce.cancel should work like a charm', async () => {
    let count = 0;
    function debounceFn(delta: number) {
      count += delta;
    }
    const { result } = renderHook(() => useDebounceFn(debounceFn, { wait: 200 }));

    act(() => {
      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
    });
    expect(count).toBe(0);

    await sleep(300);

    expect(count).toBe(2);

    act(() => {
      result.current.run(4);
    });
    expect(count).toBe(2);

    act(() => {
      result.current.cancel(); // result.current.run(4) 被取消，所以 count 还是 2
    });
    expect(count).toBe(2);
    await sleep(300);
    expect(count).toBe(2);
  });

  test('debounce.cancel should work like a charm', async () => {
    let count = 0;
    function debounceFn(delta: number) {
      count += delta;
    }
    const { result } = renderHook(() => useDebounceFn(debounceFn, { wait: 200 }));

    act(() => {
      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
      result.current.run(2);
    });
    expect(count).toBe(0);

    await sleep(300);

    expect(count).toBe(2);

    act(() => {
      result.current.run(4);
    });
    expect(count).toBe(2);

    act(() => {
      result.current.flush(); // 立即执行
    });
    expect(count).toBe(6);
    await sleep(300);
    expect(count).toBe(6);
  });
});
