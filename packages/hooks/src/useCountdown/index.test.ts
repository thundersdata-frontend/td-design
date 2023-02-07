import { act, renderHook } from '@testing-library/react-hooks';

import useSms from './index';

describe('useSms', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  test('useSms should be defined', () => {
    expect(useSms).toBeDefined();
  });

  test('useSms sendSms method should work like a charm', async () => {
    const onSend = jest.fn();
    const onAfter = jest.fn();
    const { result } = renderHook(() =>
      useSms({
        onSend,
        onAfter,
      })
    );
    await act(async () => {
      expect(result.current.text).toEqual('发送验证码');
      expect(result.current.disabled).toBeFalsy();

      await result.current.sendSms();
      expect(onAfter).toBeCalledTimes(0);

      jest.advanceTimersByTime(1100); // 1100
      expect(result.current.text).toEqual('重新发送(59s)');

      jest.advanceTimersByTime(1100); // 2200
      expect(result.current.text).toEqual('重新发送(58s)');

      jest.advanceTimersByTime(1100); // 3300
      expect(result.current.text).toEqual('重新发送(57s)');

      jest.advanceTimersByTime(60100); // 60秒
      expect(result.current.text).toEqual('重新发送');

      expect(onAfter).toBeCalledTimes(1);
    });
  });

  test('useSms onBefore method should fire before sendSms fired', async () => {
    const onBefore = jest.fn();
    const onSend = jest.fn();
    const { result } = renderHook(() =>
      useSms({
        onSend,
        onBefore,
      })
    );

    await act(async () => {
      await result.current.sendSms();

      expect(onBefore).toBeCalledTimes(1);
    });
  });

  test('useSms sendSms method will not fire when onBefore returns false', async () => {
    const onBefore = jest.fn(() => Promise.resolve(false));
    const onSend = jest.fn();
    const { result } = renderHook(() =>
      useSms({
        onSend,
        onBefore,
      })
    );

    await act(async () => {
      await result.current.sendSms();

      expect(onBefore).toBeCalledTimes(1);
      expect(onSend).not.toBeCalled();
    });
  });
});
