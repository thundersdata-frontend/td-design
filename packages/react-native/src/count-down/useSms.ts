import { useCallback, useEffect, useRef, useState } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { isIOS } from '../helper';
import Toast from '../toast';

export default function useSms(label: string, count: number, onClick: () => void, onEnd?: () => void) {
  const [disabled, setDisabled] = useState(false);
  const [smsText, setSmsText] = useState(label);
  const countRef = useRef(count);
  const interval = useRef<NodeJS.Timeout | number>();

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
    return () => {
      clearSms();
    };
  }, [clearSms]);

  const intervalFn = useCallback(() => {
    countRef.current = countRef.current - 1;
    setSmsText(`重新发送(${countRef.current}s)`);
    if (countRef.current === 0 && interval.current) {
      if (isIOS) {
        clearInterval(interval.current as NodeJS.Timeout);
        BackgroundTimer.stop();
        onEnd?.();
      } else {
        BackgroundTimer.clearInterval(interval.current as number);
        onEnd?.();
      }
      countRef.current = count;
      setSmsText('重新发送');
      setDisabled(false);
    }
  }, [count, onEnd]);

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

  const handleClick = useCallback(() => {
    if (!disabled) {
      onStart();
      onClick();
    }
  }, [disabled, onClick, onStart]);

  return { smsText, disabled, handleClick };
}
