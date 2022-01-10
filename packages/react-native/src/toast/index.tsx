import React, { ReactNode } from 'react';
import Portal from '../portal';
import Container, { ToastProps } from './Container';
import { SHORT, LONG, INFINITY } from './constant';

let toastKey = -1;
function remove(key: number) {
  Portal.remove(key);
  toastKey = -1;
}

const toast = (props: ToastProps) => {
  remove(toastKey);
  const onClose = () => {
    remove(toastKey);
  };

  toastKey = Portal.add(<Container {...props} onClose={onClose} />);

  return toastKey;
};

export default {
  /** 自动关闭延时 */
  SHORT,
  LONG,
  INFINITY,
  top({ duration = SHORT, content }: Partial<ToastProps>) {
    return toast({ content, duration, position: 'top' });
  },
  middle({ duration = SHORT, content }: Partial<ToastProps>) {
    return toast({ content, duration, position: 'middle' });
  },
  bottom({ duration = SHORT, content }: Partial<ToastProps>) {
    return toast({ content, duration, position: 'bottom' });
  },
  loading(content: ReactNode = '加载中...') {
    return toast({
      content,
      duration: INFINITY,
      position: 'middle',
      mask: true,
      indicator: true,
    });
  },
  submitting(content: ReactNode = '提交中...') {
    return toast({
      content,
      duration: INFINITY,
      position: 'middle',
      mask: true,
      indicator: true,
    });
  },
  remove(key: number) {
    remove(key);
  },
};
