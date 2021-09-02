import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from './index';

describe('useToggle', () => {
  test('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  test('initialValue should be false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBeFalsy();
  });

  test('initialValue should be hello', () => {
    const { result } = renderHook(() => useToggle('hello'));
    expect(result.current[0]).toEqual('hello');
  });

  test('value should be true after toggle was triggered', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBeTruthy();
  });

  test('value should be world after setRight was triggered', () => {
    const { result } = renderHook(() => useToggle('hello', 'world'));

    act(() => {
      result.current[1].setRight();
    });

    expect(result.current[0]).toEqual('world');
  });

  test('value should be hello after setRight and setLeft were triggered sequentially', () => {
    const { result } = renderHook(() => useToggle('hello', 'world'));

    act(() => {
      result.current[1].setRight();
    });

    act(() => {
      result.current[1].setLeft();
    });

    expect(result.current[0]).toEqual('hello');
  });
});
