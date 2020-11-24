import React from 'react';

import Portal from '../portal';
import ToastContainer, { ToastProps, ToastType } from './ToastContainer';

const SHORT = 3000;
const LONG = 5000;

type PartialToastProps = Partial<ToastProps> & {
  autoClose?: boolean;
  duration?: number;
};

let toastKey = 0;

function remove(key: number) {
  Portal.remove(key);
  toastKey = 0;
}

const toast = (
  { content = '', duration = SHORT, position = 'top', autoClose = true, onClose, onPress }: PartialToastProps,
  type: ToastType
) => {
  remove(toastKey);
  const timer = setTimeout(() => {
    if (autoClose) {
      onClose?.();
      remove(toastKey);
    }
  }, duration);

  const props = {
    content,
    duration,
    position,
    type,
    autoClose,
  };
  if (onClose) {
    Object.assign(props, {
      onClose: () => {
        onClose();
        remove(toastKey);
        clearTimeout(timer);
      },
    });
  }
  if (onPress) {
    Object.assign(props, {
      onPress: () => {
        onPress();
        onClose?.();
        remove(toastKey);
        clearTimeout(timer);
      },
    });
  }
  toastKey = Portal.add(<ToastContainer {...props} />);

  return toastKey;
};

export default {
  /** 自动关闭延时 */
  SHORT,
  LONG,
  info(props: PartialToastProps) {
    return toast({ ...props, position: 'bottom' }, ToastType.INFO);
  },
  success(props: PartialToastProps) {
    return toast({ ...props, position: 'bottom' }, ToastType.SUCCESS);
  },
  fail(props: PartialToastProps) {
    return toast({ ...props, position: 'bottom' }, ToastType.FAIL);
  },
  loading(props: PartialToastProps) {
    return toast({ ...props, position: 'top', autoClose: false }, ToastType.LOADING);
  },
  remove(key: number) {
    remove(key);
  },
};
