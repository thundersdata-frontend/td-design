import { renderHook } from '@testing-library/react-hooks';

import useLatest from './index';

describe('useLatest', () => {
  test('useLatest should be defined', () => {
    expect(useLatest).toBeDefined();
  });

  test('useLatest with basic variable should work like a charm', () => {
    const { result, rerender } = renderHook(state => useLatest(state), { initialProps: 0 });

    rerender(1);
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);
  });

  test('useLatest with reference variable should work like a charm', () => {
    const { result, rerender } = renderHook(state => useLatest(state), { initialProps: {} });

    expect(result.current.current).toEqual({});

    rerender([]);
    expect(result.current.current).toEqual([]);
  });

  test('useLatest with function should work like a charm', () => {
    const fn = jest.fn();
    const { result, rerender } = renderHook(state => useLatest(state), { initialProps: fn });

    expect(result.current.current).toEqual(fn);

    rerender();
    expect(result.current.current).toEqual(fn);
  });
});
