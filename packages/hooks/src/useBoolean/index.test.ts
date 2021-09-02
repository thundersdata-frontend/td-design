import { renderHook, act } from '@testing-library/react-hooks';
import useBoolean from './index';

describe('useBoolean', () => {
  test('useBoolean should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  test('initialValue should be false', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBeFalsy();
  });

  test('initialValue should be true', () => {
    const { result } = renderHook(() => useBoolean(true));

    expect(result.current[0]).toBeTruthy();
  });

  test('value should be true after toggle was triggered', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBeTruthy();
  });

  test('value should be false after toggle was triggered', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBeFalsy();
  });

  test('value should be true after setTrue was triggered', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current[1].setTrue();
    });

    expect(result.current[0]).toBeTruthy();
  });

  test('value should be false after setFalse was triggered', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current[1].setFalse();
    });

    expect(result.current[0]).toBeFalsy();
  });

  test('value should be true after set was triggered', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current[1].set(true);
    });

    expect(result.current[0]).toBeTruthy();
  });

  test('value should be false after set was triggered', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current[1].set(false);
    });

    expect(result.current[0]).toBeFalsy();
  });
});
