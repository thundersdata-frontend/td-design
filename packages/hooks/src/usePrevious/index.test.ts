import { renderHook } from '@testing-library/react-hooks';
import usePrevious, { ShouldUpdateFunc } from './index';

describe('usePrevious', () => {
  test('usePrevious should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  function setup<T>(initialValue?: T, compareFunction?: ShouldUpdateFunc<T>) {
    return renderHook(({ val, cmpFunc }) => usePrevious<T>(val as T, cmpFunc), {
      initialProps: {
        val: initialValue || 0,
        cmpFunc: compareFunction,
      } as { val?: T; cmpFunc?: ShouldUpdateFunc<T> },
    });
  }

  test('usePrevious should be undefined if no initialValue', () => {
    const { result } = setup();
    expect(result.current).toBeUndefined();
  });

  test('usePrevious should be undefined even if initialValue passed', () => {
    const { result } = setup(2);
    expect(result.current).toBeUndefined();
  });

  test('usePrevious should update previous value only after render with different value', () => {
    const { result, rerender } = setup(0);
    expect(result.current).toBeUndefined();

    rerender({ val: 1 });
    expect(result.current).toBe(0);

    rerender({ val: 2 });
    expect(result.current).toBe(1);

    rerender({ val: 3 });
    expect(result.current).toBe(2);
  });

  test('usePrevious should work fine with undefined values', () => {
    const { result, rerender } = setup(0);
    expect(result.current).toBeUndefined();

    rerender({ val: 1 });
    expect(result.current).toBe(0);

    rerender({ val: undefined });
    expect(result.current).toBe(1);

    rerender({ val: 3 });
    expect(result.current).toBeUndefined();
  });

  test('usePrevious compareFunction should work like a charm', () => {
    const obj1 = { label: 'John', value: 'john' };
    const obj2 = { label: 'Jonny', value: 'john' };
    const obj3 = { label: 'Kate', value: 'kate' };
    type Obj = { label: string; value: string };
    const compareFunction = (a?: Obj, b?: Obj) => (a && b ? a.value !== b.value : true);

    const { result, rerender } = setup(obj1, compareFunction);

    expect(result.current).toBeUndefined();

    rerender({ val: obj2, cmpFunc: compareFunction });
    expect(result.current).toBeUndefined();

    rerender({ val: obj3, cmpFunc: compareFunction });
    expect(result.current).toBe(obj1);
  });
});
