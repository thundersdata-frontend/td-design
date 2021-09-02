import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './index';

describe('useCounter', () => {
  test('useCounter should be defined', () => {
    expect(useCounter).toBeDefined();
  });

  test('initialValue should work like a charm', () => {
    const { result } = renderHook(() => useCounter(2));

    expect(result.current[0]).toBe(2);
  });

  test('min value should be 2', () => {
    const { result } = renderHook(() => useCounter(1, { min: 2 }));

    expect(result.current[0]).toBe(2);
  });

  test('max value should be 5', () => {
    const { result } = renderHook(() => useCounter(7, { max: 5 }));

    expect(result.current[0]).toBe(5);
  });

  test('state should be 1 when inc was triggered', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current[1].inc();
    });

    expect(result.current[0]).toBe(1);
  });

  test('state should be 2 when inc was triggered', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current[1].inc(2);
    });

    expect(result.current[0]).toBe(2);
  });

  test('state should be 3 when inc was triggered', () => {
    const { result } = renderHook(() => useCounter(2));

    act(() => {
      result.current[1].inc();
    });

    expect(result.current[0]).toBe(3);
  });

  test('state should be -1 when dec was triggered', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current[1].dec();
    });

    expect(result.current[0]).toBe(-1);
  });

  test('state should be 0 when dec was triggered', () => {
    const { result } = renderHook(() => useCounter(1));

    act(() => {
      result.current[1].dec();
    });

    expect(result.current[0]).toBe(0);
  });

  test('state should be 0 when reset was triggered', () => {
    const { result } = renderHook(() => useCounter(2));

    act(() => {
      result.current[1].dec(2);
    });

    expect(result.current[0]).toBe(0);
  });

  test('state should be 2 when set was triggered', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current[1].set(2);
    });

    expect(result.current[0]).toBe(2);
  });
});
