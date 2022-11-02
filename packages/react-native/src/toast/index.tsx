import React, { ReactNode } from 'react';
import Portal from '../portal';
import Container, { ToastProps } from './Container';
import { DEFAULT, SHORT, LONG, INFINITY } from './constant';

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
  top({ duration = DEFAULT, content }: Partial<ToastProps>) {
    return toast({ content, duration, position: 'top' });
  },
  middle({ duration = DEFAULT, content }: Partial<ToastProps>) {
    return toast({ content, duration, position: 'middle' });
  },
  bottom({ duration = DEFAULT, content }: Partial<ToastProps>) {
    return toast({ content, duration, position: 'bottom' });
  },
  process(content: ReactNode = '加载中...') {
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
