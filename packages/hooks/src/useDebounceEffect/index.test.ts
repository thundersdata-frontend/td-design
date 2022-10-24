import { act, renderHook } from '@testing-library/react-hooks';

import { sleep } from '../utils/testHelpers';
import useDebounceEffect from './index';

describe('useDebounceEffect', () => {
  test('useDebounceEffect should be defined', () => {
    expect(useDebounceEffect).toBeDefined();
  });

  test('useDebounceEffect should work like a charm', async () => {
    const mockEffect = jest.fn();
    const mockCleanup = jest.fn();

    const { rerender } = renderHook(props =>
      useDebounceEffect(
        () => {
          mockEffect();
          return () => mockCleanup();
        },
        [props],
        { wait: 200 }
      )
    );
    expect(mockEffect).not.toBeCalled();
    expect(mockCleanup).not.toBeCalled();

    await act(async () => {
      rerender(2);
      await sleep(50);
    });
    expect(mockEffect).not.toBeCalled();
    expect(mockCleanup).not.toBeCalled();

    await act(async () => {
      rerender(3);
      await sleep(400);
    });
    expect(mockEffect).toBeCalled();
    expect(mockCleanup).not.toBeCalled();
  });

  test('useDebounceEffect should cancel timeout on unmount', async () => {
    const mockEffect = jest.fn();
    const mockCleanup = jest.fn();

    const { rerender, unmount } = renderHook(props =>
      useDebounceEffect(
        () => {
          mockEffect();

          return () => mockCleanup();
        },
        [props],
        { wait: 200 }
      )
    );

    await act(async () => {
      rerender(4);
      await sleep(400);
      unmount();
    });

    expect(mockCleanup.mock.calls.length).toEqual(1);
  });
});
