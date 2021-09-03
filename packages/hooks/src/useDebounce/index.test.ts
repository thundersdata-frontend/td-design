import { renderHook, act } from '@testing-library/react-hooks';
import { sleep } from '../utils/testHelpers';
import useDebounce from './index';

describe('useDebounce', () => {
  test('useDebounce should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  test('state should change after 250ms delay', async () => {
    let mountedState = 0;
    const { result, rerender } = renderHook(() => useDebounce(mountedState, { wait: 200 }));
    expect(result.current).toEqual(0);

    await act(async () => {
      mountedState = 1;
      rerender();
      await sleep(50);
      expect(result.current).toEqual(0);
    });

    await act(async () => {
      mountedState = 2;
      rerender();
      await sleep(100);
      expect(result.current).toEqual(0);
    });

    await act(async () => {
      mountedState = 3;
      rerender();
      await sleep(250);
      expect(result.current).toEqual(3);
    });
  });
});
