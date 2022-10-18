import { act, renderHook } from '@testing-library/react-hooks';
import useSafeState from './index';

describe('useSafeState', () => {
  test('useSafeState should be defined', () => {
    expect(useSafeState).toBeDefined();
  });

  test('useSafeState should support initialState', () => {
    const { result } = renderHook(() => useSafeState(2));

    expect(result.current[0]).toBe(2);
  });

  test('useSafeState should update', () => {
    const { result } = renderHook(() => useSafeState(() => ({ hello: 'world' })));
    const [, setState] = result.current;
    act(() => {
      setState({ hello: 'react' });
    });

    expect(result.current[0]).toEqual({ hello: 'react' });
  });

  test('useSafeState should not update when unmounted', () => {
    const { result, unmount } = renderHook(() => useSafeState(2));

    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1](3);
    });
    expect(result.current[0]).toBe(3);

    unmount();
    act(() => {
      result.current[1](4);
    });
    expect(result.current[0]).toBe(3);
  });
});
