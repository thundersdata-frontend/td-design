import { act, renderHook } from '@testing-library/react-hooks';

import { sleep } from '../utils/testHelpers';
import useThrottleEffect from './index';

describe('useThrottleEffect', () => {
  test('useThrottleEffect should be defined', () => {
    expect(useThrottleEffect).toBeDefined();
  });

  test('useThrottleEffect should work like a charm', async () => {
    const mockEffect = jest.fn();
    const mockCleanup = jest.fn();

    const { rerender } = renderHook(props =>
      useThrottleEffect(
        () => {
          mockEffect();

          return () => mockCleanup();
        },
        [props],
        { wait: 200 }
      )
    );

    expect(mockEffect).toBeCalled();
    expect(mockCleanup).not.toBeCalled();

    await act(async () => {
      rerender(2);
      await sleep(300);

      expect(mockEffect).toBeCalled();
      expect(mockCleanup).toBeCalled();
      expect(mockEffect.mock.calls.length).toBe(2);
      expect(mockCleanup.mock.calls.length).toBe(1);

      rerender(3);
      expect(mockEffect.mock.calls.length).toBe(2);
      expect(mockCleanup.mock.calls.length).toBe(1);

      await sleep(300);
      expect(mockEffect.mock.calls.length).toBe(3);
      expect(mockCleanup.mock.calls.length).toBe(2);
    });
  });

  test('useThrottleEffect should cancel timeout on unmount', async () => {
    const mockEffect = jest.fn();
    const mockCleanup = jest.fn();

    const { rerender, unmount } = renderHook(props =>
      useThrottleEffect(
        () => {
          mockEffect();

          return () => mockCleanup();
        },
        [props],
        { wait: 200 }
      )
    );
    expect(mockEffect).toBeCalled();
    expect(mockCleanup).not.toBeCalled();

    rerender(1);
    await sleep(100);
    unmount();

    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanup.mock.calls.length).toBe(1);
  });
});
