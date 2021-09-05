import { renderHook, act } from '@testing-library/react-hooks';
import useSms from './index';

describe('useSms', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('useSms should be defined', () => {
    expect(useSms).toBeDefined();
  });

  test('useSms sendSms method should work like a charm', async () => {
    const onSend = jest.fn();
    const { result } = renderHook(() =>
      useSms({
        onSend,
      })
    );
    await act(async () => {
      expect(result.current.text).toEqual('发送验证码');
      expect(result.current.disabled).toBeFalsy();

      await result.current.sendSms();
      jest.advanceTimersByTime(1100); // 1100
      expect(result.current.text).toEqual('重新发送(59)s');

      jest.advanceTimersByTime(1100); // 2200
      expect(result.current.text).toEqual('重新发送(58)s');
    });
  });

  test('useSms text should be the same with resendLabel after count be 0', async () => {
    const onSend = jest.fn();
    const { result } = renderHook(() =>
      useSms({
        onSend,
      })
    );
    await act(async () => {
      expect(result.current.text).toEqual('发送验证码');

      await result.current.sendSms();
      jest.advanceTimersByTime(60000); // 6000
      expect(result.current.text).toEqual('重新发送');
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

  test('useSms onAfter method should fire when count is 0', async () => {
    const onSend = jest.fn();
    const onAfter = jest.fn();
    const { result } = renderHook(() =>
      useSms({
        onSend,
        onAfter,
      })
    );

    await act(async () => {
      await result.current.sendSms();
      jest.advanceTimersByTime(60001); // 60001
      expect(onAfter).toBeCalledTimes(1);
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
