import { act, renderHook } from '@testing-library/react-hooks';

import useRafInterval from './index';

const FRAME_TIME = 16.7;
describe('useRafInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('useRafInterval should be defined', () => {
    expect(useRafInterval).toBeDefined();
  });

  test('useRafInterval should work like a charm', () => {
    const callback = jest.fn();

    renderHook(() => useRafInterval(callback, FRAME_TIME));
    expect(callback).not.toBeCalled();

    act(() => {
      requestAnimationFrame(() => {
        expect(callback).toBeCalledTimes(1);
      });
      requestAnimationFrame(() => {
        expect(callback).toBeCalledTimes(2);
      });
    });
  });

  test('userInterval should not work when delay is undefined', () => {
    const callback = jest.fn();
    renderHook(() => useRafInterval(callback));

    expect(callback).not.toBeCalled();

    act(() => {
      requestAnimationFrame(() => {
        expect(callback).not.toBeCalled();
      });
    });
  });

  test('immediate in options should work', () => {
    const callback = jest.fn();
    renderHook(() => useRafInterval(callback, FRAME_TIME, { immediate: true }));

    expect(callback).toBeCalled();

    act(() => {
      requestAnimationFrame(() => {
        expect(callback).toBeCalledTimes(2);
      });
      requestAnimationFrame(() => {
        expect(callback).toBeCalledTimes(3);
      });
    });
  });
});
