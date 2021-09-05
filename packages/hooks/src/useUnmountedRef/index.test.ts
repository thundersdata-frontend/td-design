import { renderHook } from '@testing-library/react-hooks';
import useUnmountedRef from './index';

describe('useUnmountedRef', () => {
  test('useUnmountedRef should be defined', () => {
    expect(useUnmountedRef).toBeDefined();
  });

  test('useUnmountedRef should work like a charm', () => {
    const { result, rerender, unmount } = renderHook(() => useUnmountedRef());

    expect(result.current.current).toBeFalsy();

    rerender();
    expect(result.current.current).toBeFalsy();

    unmount();
    expect(result.current.current).toBeTruthy();
  });
});
