import { ForwardedRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import useCountdown from '../useCountdown';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';

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
  ref?: ForwardedRef<TextInput>;
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
  const { count: currentCount, start, stop } = useCountdown(count);

  const beforeRef = useLatest(onBefore);
  const sendRef = useLatest(onSend);
  const afterRef = useLatest(onAfter);

  const [text, setText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (currentCount === 0) {
      afterRef.current?.();
      setStarted(false);
    }
  }, [currentCount]);

  useEffect(() => {
    if (!started) {
      setText(defaultLabel);
    } else if (currentCount !== 0) {
      setText(`${resendLabel}(${currentCount}s)`);
    } else {
      setText(resendLabel);
    }
  }, [currentCount, defaultLabel, resendLabel]);

  /**
   * 发送验证码
   */
  const sendSms = async (...args: any[]) => {
    let validateResult = true;
    if (beforeRef.current) {
      validateResult = await beforeRef.current();
    }
    if (validateResult) {
      if (ref) {
        (ref as MutableRefObject<TextInput>).current.focus();
      }
      sendRef.current(...args);
      // 开始倒计时
      start();
      setStarted(true);
    }
  };

  return {
    text,
    disabled: started,
    sendSms: useMemoizedFn(sendSms),
  };
}
