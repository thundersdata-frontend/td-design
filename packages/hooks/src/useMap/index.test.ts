import { act, renderHook } from '@testing-library/react-hooks';
import useMap from './index';

describe('useMap', () => {
  test('useMap should be defined', () => {
    expect(useMap).toBeDefined();
  });

  test('useMap initialValue should work like a charm', () => {
    const { result } = renderHook(() =>
      useMap<any, any>([
        ['foo', 'bar'],
        ['a', 1],
      ])
    );

    expect(Array.from(result.current[0])).toEqual([
      ['foo', 'bar'],
      ['a', 1],
    ]);
  });

  test('useMap state should be empty if no initialValue', () => {
    const { result } = renderHook(() => useMap());
    expect(Array.from(result.current[0])).toEqual([]);
  });

  test('useMap get method should work like a charm', () => {
    const { result } = renderHook(() =>
      useMap<any, any>([
        ['foo', 'bar'],
        ['a', 1],
      ])
    );

    let value;
    act(() => {
      value = result.current[1].get('a');
    });
    expect(value).toBe(1);

    let value2;
    act(() => {
      value2 = result.current[1].get('foo');
    });
    expect(value2).toBe('bar');
  });

  test('useMap set method should work like a charm', () => {
    const { result } = renderHook(() => useMap());

    act(() => {
      result.current[1].set('foo', 'bar');
    });

    expect(Array.from(result.current[0])).toEqual([['foo', 'bar']]);

    act(() => {
      result.current[1].set('foo', 'baz');
      result.current[1].set('test', '123');
    });

    expect(Array.from(result.current[0])).toEqual([
      ['foo', 'baz'],
      ['test', '123'],
    ]);
  });

  test('useMap replace method should work like a charm', () => {
    const { result } = renderHook(() =>
      useMap<any, any>([
        ['foo', 'bar'],
        ['a', 1],
      ])
    );

    act(() => {
      result.current[1].replace([['b', 2]]);
    });

    expect(Array.from(result.current[0])).toEqual([['b', 2]]);
  });

  test('useMap remove method should work like a charm', () => {
    const { result } = renderHook(() =>
      useMap<any, any>([
        ['foo', 'bar'],
        ['a', 1],
      ])
    );

    act(() => {
      result.current[1].remove('foo');
    });
    expect(Array.from(result.current[0])).toEqual([['a', 1]]);
  });

  test('useMap reset method should work like a charm', () => {
    const { result } = renderHook(() =>
      useMap<any, any>([
        ['foo', 'bar'],
        ['a', 1],
      ])
    );

    act(() => {
      result.current[1].set('b', 2);
    });

    expect(Array.from(result.current[0])).toEqual([
      ['foo', 'bar'],
      ['a', 1],
      ['b', 2],
    ]);

    act(() => {
      result.current[1].reset();
    });

    expect(Array.from(result.current[0])).toEqual([
      ['foo', 'bar'],
      ['a', 1],
    ]);
  });
});
