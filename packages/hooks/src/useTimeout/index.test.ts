import { renderHook } from '@testing-library/react-hooks';
import useTimeout from './index';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('useTimeout should be defined', () => {
    expect(useTimeout).toBeDefined();
  });

  test('useTimeout should work like a charm', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, 200));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
