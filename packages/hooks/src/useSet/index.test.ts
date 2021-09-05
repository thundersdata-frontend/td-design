import { act, renderHook } from '@testing-library/react-hooks';
import useSet from './index';

describe('useSet', () => {
  test('useSet should be defined', () => {
    expect(useSet).toBeDefined();
  });

  test('useSet initialValue should work like a charm', () => {
    const { result } = renderHook(() => useSet(['hello']));

    expect(result.current[0].has('hello')).toBeTruthy();
    expect(Array.from(result.current[0])).toEqual(['hello']);
  });

  test('useSet state should be empty if no initialValue', () => {
    const { result } = renderHook(() => useSet());

    expect(Array.from(result.current[0])).toEqual([]);
  });

  test('useSet add method should work like a charm', () => {
    const { result } = renderHook(() => useSet(['hello']));

    act(() => {
      result.current[1].add('world');
    });

    expect(Array.from(result.current[0])).toEqual(['hello', 'world']);
  });

  test('useSet add existed key should remain the same', () => {
    const { result } = renderHook(() => useSet(['hello']));

    act(() => {
      result.current[1].add('hello');
    });

    expect(Array.from(result.current[0])).toEqual(['hello']);
  });

  test('useSet remove method should work like a charm', () => {
    const { result } = renderHook(() => useSet(['hello']));

    act(() => {
      result.current[1].remove('hello');
    });

    expect(result.current[0].has('hello')).toBeFalsy();
  });

  test('useSet remove non-existed key should work', () => {
    const { result } = renderHook(() => useSet(['hello']));

    act(() => {
      result.current[1].remove('world');
    });

    expect(result.current[0].has('hello')).toBeTruthy();
  });

  test('useSet reset method should work like a charm', () => {
    const { result } = renderHook(() => useSet(['hello']));

    act(() => {
      result.current[1].remove('hello');
    });

    expect(result.current[0].has('hello')).toBeFalsy();

    act(() => {
      result.current[1].reset();
    });
    expect(result.current[0].has('hello')).toBeTruthy();
  });

  test('useSet clear method should work like a charm', () => {
    const { result } = renderHook(() => useSet(['hello']));

    act(() => {
      result.current[1].clear();
    });
    expect(Array.from(result.current[0])).toEqual([]);
  });
});
