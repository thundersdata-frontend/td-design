import { useRef, useEffect, useState, ForwardedRef, MutableRefObject } from 'react';
import { TextInput } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import { isIOS } from '../utils/platform';

interface Props {
  /** 倒计时时长，默认为 60s */
  count?: number;
  /** 倒计时文字，默认为：获取验证码 */
  defaultLabel?: string;
  /** 重新发送文字，默认为：重新发送 */
  resendLabel?: string;
  /** 发送之前执行的函数，结果将决定验证码是否允许发送。通常用在验证码发送之前的手机号校验的场景 */
  onBefore?: () => Promise<boolean>;
  /** 发送验证码 */
  onSend: (...args: any[]) => void;
  /** 倒计时结束之后执行的函数 */
  onAfter?: () => void;
  ref: ForwardedRef<TextInput>;
}

/**
 * 用于发送手机验证码的 hook。
 * @param props 参数
 */
export default function useSms({
  defaultLabel = '发送验证码',
  resendLabel = '重新发送',
  count = 60,
  onBefore,
  onSend,
  onAfter,
  ref,
}: Props) {
  const beforeFnRef = useLatest(onBefore);
  const sendFnRef = useLatest(onSend);
  const afterFnRef = useLatest(onAfter);

  const [started, setStarted] = useState(false);
  const [text, setText] = useState(defaultLabel);

  const countRef = useRef(count);
  const timer = useRef<NodeJS.Timer | number>();

  /**
   * 倒计时的方法
   */
  const intervalFn = useMemoizedFn(() => {
    countRef.current = countRef.current - 1;
    setText(`${resendLabel}(${countRef.current}s)`);

    if (countRef.current === 0) {
      clearIntervalFn();
      afterFnRef.current?.();
      countRef.current = count;
      setText(resendLabel);
      setStarted(false);
    }
  });

  /**
   * 清除倒计时的方法
   */
  const clearIntervalFn = useMemoizedFn(() => {
    if (!timer.current) return;
    if (isIOS()) {
      BackgroundTimer.stop();
      clearInterval(timer.current as NodeJS.Timer);
    } else {
      BackgroundTimer.clearInterval(timer.current as number);
    }
  });

  /**
   * 在 started 标识位为 true 的时候，开始进行倒计时
   */
  useEffect(() => {
    if (started) {
      if (isIOS()) {
        BackgroundTimer.start();
        timer.current = setInterval(() => {
          intervalFn();
        }, 1000);
      } else {
        timer.current = BackgroundTimer.setInterval(() => {
          intervalFn();
        }, 1000);
      }
    }
    return () => {
      clearIntervalFn();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  /**
   * 发送验证码
   */
  const sendSms = async (...args: any[]) => {
    const validateResult = (await beforeFnRef.current?.()) ?? true;
    if (!started && validateResult) {
      setStarted(true);
      if (ref) {
        (ref as MutableRefObject<TextInput>).current.focus();
      }
      sendFnRef.current(...args);
    }
  };

  return {
    text,
    disabled: started,
    sendSms: useMemoizedFn(sendSms),
  };
}
