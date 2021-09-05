import { renderHook } from '@testing-library/react-hooks';
import useInterval from './index';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('useInterval should be defined', () => {
    expect(useInterval).toBeDefined();
  });

  test('useInterval should work like a charm', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, 20));
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalledTimes(10);
  });

  test('userInterval should not work when delay is undefined', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(200);

    expect(callback).not.toBeCalled();
  });

  test('immediate in options should work', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 20, { immediate: true }));

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});
