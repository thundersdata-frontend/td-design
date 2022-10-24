import { renderHook } from '@testing-library/react-hooks';

import useMount from './index';

describe('useMount', () => {
  test('useMount should be defined', () => {
    expect(useMount).toBeDefined();
  });

  test('useMount parameter should be function', () => {
    const { result } = renderHook(() => useMount(1 as any));
    expect(result.error).toBeDefined();
  });

  test('useMount should work like a charm', () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(() => useMount(fn));

    expect(fn).toBeCalledTimes(1);

    rerender();
    expect(fn).toBeCalledTimes(1);

    unmount();
    expect(fn).toBeCalledTimes(1);
  });
});
