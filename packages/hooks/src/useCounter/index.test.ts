import { act, renderHook } from '@testing-library/react-hooks';

import useCounter from './index';

describe('useCounter', () => {
  test('useCounter should be defined', () => {
    expect(useCounter).toBeDefined();
  });

  test('initialValue should work like a charm', () => {
    const { result } = renderHook(() => useCounter(2));

    expect(result.current[0]).toBe(2);
  });

  test('state should be empty string if no initialValue passed', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current[0]).toBe(0);
  });

  test('min value should be 2', () => {
    const { result } = renderHook(() => useCounter(1, { min: 2 }));

    expect(result.current[0]).toBe(2);
  });

  test('max value should be 5', () => {
    const { result } = renderHook(() => useCounter(7, { max: 5 }));

    expect(result.current[0]).toBe(5);
  });

  test('actions should work like a charm', () => {
    const { result } = renderHook(() => useCounter(100, { min: 1, max: 10 }));
    expect(result.current[0]).toEqual(10);

    const [, { inc, dec, reset, set }] = result.current;

    act(() => {
      inc(1);
    });
    expect(result.current[0]).toEqual(10);

    act(() => {
      dec(100);
    });
    expect(result.current[0]).toEqual(1);

    act(() => {
      inc(2);
    });
    expect(result.current[0]).toEqual(3);

    act(() => {
      reset();
    });
    expect(result.current[0]).toEqual(10);

    act(() => {
      set(6);
    });
    expect(result.current[0]).toEqual(6);

    act(() => {
      set(60);
    });
    expect(result.current[0]).toEqual(10);

    act(() => {
      set(-100);
    });
    expect(result.current[0]).toEqual(1);

    act(() => {
      inc();
      inc();
      inc();
    });
    expect(result.current[0]).toEqual(4);
  });
});
