import React from 'react';

import Portal from '../portal';
import ToastContainer, { ToastProps, ToastType } from './ToastContainer';
import SubmitContainer from './SubmitContainer';

const SHORT = 3000;
const LONG = 5000;

let toastKey = -1;
function remove(key: number) {
  Portal.remove(key);
  toastKey = -1;
}

const toast = (
  { content = '', duration = SHORT, position = 'top', autoClose = true, onClose, onPress }: Partial<ToastProps>,
  type: ToastType
) => {
  remove(toastKey);

  const props = {
    content,
    duration,
    position,
    type,
    autoClose,
    showClose: !!onClose,
  };
  Object.assign(props, {
    onClose: () => {
      onClose?.();
      remove(toastKey);
    },
  });
  Object.assign(props, {
    onPress: () => {
      onPress?.();
      remove(toastKey);
    },
  });
  toastKey = Portal.add(
    position === 'middle' ? <SubmitContainer content={props.content} /> : <ToastContainer {...props} />
  );

  return toastKey;
};

export default {
  /** 自动关闭延时 */
  SHORT,
  LONG,
  info(props: Partial<ToastProps>) {
    return toast({ ...props, position: 'bottom' }, ToastType.INFO);
  },
  success(props: Partial<ToastProps>) {
    return toast({ ...props, position: 'bottom' }, ToastType.SUCCESS);
  },
  fail(props: Partial<ToastProps>) {
    return toast({ ...props, position: 'bottom' }, ToastType.FAIL);
  },
  loading(props: Partial<ToastProps>) {
    return toast({ ...props, position: 'top', autoClose: false }, ToastType.LOADING);
  },
  submitting(props?: Partial<ToastProps>) {
    return toast({ content: '正在提交...', ...props, position: 'middle', autoClose: false }, ToastType.SUBMITTING);
  },
  remove(key: number) {
    remove(key);
  },
};
