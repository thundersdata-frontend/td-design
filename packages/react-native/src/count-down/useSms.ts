import { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import helpers from '../helpers';
import Toast from '../toast';

export interface SmsProps {
  /** 倒计时文字，默认为 获取验证码 */
  label?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 发送验证码之前的回调，通常用于判断手机号是否有值 */
  onBeforeSend?: () => Promise<boolean>;
  /** 发送验证码 */
  onSend: () => void;
  /** 倒计时结束后的回调 */
  onAfterSend?: () => void;
}

const { isIOS } = helpers;
export default function useSms({ label, count = 60, onBeforeSend, onSend, onAfterSend }: SmsProps) {
  const [disabled, setDisabled] = useState(false);
  const [smsText, setSmsText] = useState(label);
  const countRef = useRef(count);
  const interval = useRef<NodeJS.Timeout | number>();
  const inputRef = useRef<TextInput>(null);

  /** 清除倒计时 */
  const clearSms = useCallback(() => {
    if (interval.current) {
      if (isIOS) {
        clearInterval(interval.current as NodeJS.Timeout);
        BackgroundTimer.stop();
      } else {
        BackgroundTimer.clearInterval(interval.current as number);
      }
    }
    setDisabled(false);
    setSmsText(label);
  }, [label]);

  useEffect(() => {
    return () => clearSms();
  }, [clearSms]);

  const intervalFn = useCallback(() => {
    countRef.current = countRef.current - 1;
    setSmsText(`重新发送(${countRef.current}s)`);
    if (countRef.current === 0 && interval.current) {
      if (isIOS) {
        clearInterval(interval.current as NodeJS.Timeout);
        BackgroundTimer.stop();
        onAfterSend?.();
      } else {
        BackgroundTimer.clearInterval(interval.current as number);
        onAfterSend?.();
      }
      countRef.current = count;
      setSmsText('重新发送');
      setDisabled(false);
    }
  }, [count, onAfterSend]);

  const onStart = useCallback(() => {
    setDisabled(true);
    Toast.success({ content: '验证码发送成功' });
    if (isIOS) {
      BackgroundTimer.start();
      interval.current = setInterval(() => {
        intervalFn();
      }, 1000);
    } else {
      interval.current = BackgroundTimer.setInterval(() => {
        intervalFn();
      }, 1000);
    }
  }, [intervalFn]);

  /** 发送验证码 */
  const handleClick = useCallback(async () => {
    const beforeCheck = (await onBeforeSend?.()) ?? true;
    if (!disabled && beforeCheck) {
      inputRef.current?.focus(); // 点击之后就聚焦到输入框里
      onStart();
      onSend();
    }
  }, [disabled, onSend, onStart, onBeforeSend]);

  return { smsText, disabled, handleClick, inputRef };
}
