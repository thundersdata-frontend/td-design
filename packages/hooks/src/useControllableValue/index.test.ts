import { renderHook, act } from '@testing-library/react-hooks';
import useControllableValue from './index';

describe('useControllableValue', () => {
  test('useControllableValue should be defined', () => {
    expect(useControllableValue).toBeDefined();
  });

  test('defaultValue should work like a charm', () => {
    const { result } = renderHook(() => useControllableValue({ defaultValue: 1 }));
    expect(result.current[0]).toEqual(1);
  });

  test('value should override defaultValue', () => {
    const { result } = renderHook(() => useControllableValue({ defaultValue: 1, value: 2 }));
    expect(result.current[0]).toEqual(2);
  });

  test('value should be undefined if nothing passed', () => {
    const { result } = renderHook(() => useControllableValue());
    expect(result.current[0]).toBeUndefined();
  });

  test('onChange should work like a charm', () => {
    let extraParam = '';
    const props = {
      value: 2,
      onChange(v: number, extra: any) {
        this.value = v;
        extraParam = extra;
      },
    };
    const { result } = renderHook(() => useControllableValue(props));
    expect(result.current[0]).toEqual(2);

    act(() => {
      result.current[1](3, 'test');
    });

    expect(props.value).toEqual(3);
    expect(extraParam).toEqual('test');
  });

  test('state should update when rerender', () => {
    const { result, rerender } = renderHook(props => useControllableValue(props), {
      initialProps: {
        value: 2,
      },
    });

    rerender({ value: 3 });

    expect(result.current[0]).toEqual(3);

    rerender({ value: 1 });

    expect(result.current[0]).toEqual(1);
  });

  test('state should update when set was triggered', () => {
    const { result } = renderHook(() => useControllableValue({ newValue: 1 }));
    const [, setValue] = result.current;

    act(() => setValue(undefined));
    expect(result.current[0]).toBeUndefined();

    act(() => setValue(null));
    expect(result.current[0]).toBeNull();

    act(() => setValue(55));
    expect(result.current[0]).toBe(55);
  });
});
