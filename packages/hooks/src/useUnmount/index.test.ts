import { renderHook } from '@testing-library/react-hooks';
import useUnmount from './index';

describe('useUnmount', () => {
  test('useUnmount should be defined', () => {
    expect(useUnmount).toBeDefined();
  });

  test('useUnmount should work like a charm', () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0);

    rerender();
    expect(fn).toBeCalledTimes(0);

    unmount();
    expect(fn).toBeCalledTimes(1);
  });
});
