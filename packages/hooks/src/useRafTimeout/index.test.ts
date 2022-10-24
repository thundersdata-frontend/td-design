import { act, renderHook } from '@testing-library/react-hooks';

import useRafTimeout from './index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useRafTimeout(fn, delay));

const FRAME_TIME = 16.7;
describe('useRafTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('useRafTimeout should be defined', () => {
    expect(useRafTimeout).toBeDefined();
  });

  it('useRafTimeout should work like a charm', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toBeCalled();

    act(() => {
      requestAnimationFrame(() => {
        expect(callback).not.toBeCalled();
      });
      requestAnimationFrame(() => {
        expect(callback).toBeCalledTimes(1);
      });
    });
  });

  it('timeout should stop when delay is undefined', () => {
    const delay: number | undefined = undefined;
    const callback = jest.fn();
    setUp({ fn: callback, delay });
    expect(callback).not.toBeCalled();

    act(() => {
      requestAnimationFrame(() => {
        expect(callback).not.toBeCalled();
      });
      requestAnimationFrame(() => {
        expect(callback).not.toBeCalled();
      });
    });
  });
});
