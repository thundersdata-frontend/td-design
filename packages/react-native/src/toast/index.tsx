import React, { useRef } from 'react';

import { useMemoizedFn } from '@td-design/rn-hooks';

import { addNewRef, getRef, removeOldRef } from '../utils/ref-util';
import { INFINITY, LONG, SHORT } from './constant';
import ToastRoot from './ToastRoot';
import { ToastProps } from './type';

export interface ToastRef {
  show: (params: ToastProps) => void;
  hide: () => void;
}

type ToastRefObj = {
  current: ToastRef | null;
};

let refs: ToastRefObj[] = [];

export default function Toast() {
  const toastRef = useRef<ToastRef | null>(null);

  const setRef = useMemoizedFn((ref: ToastRef | null) => {
    if (ref) {
      toastRef.current = ref;
      addNewRef(refs, ref);
    } else {
      removeOldRef(refs, toastRef.current);
    }
  });

  return <ToastRoot ref={setRef} />;
}
Toast.displayName = 'Toast';

Toast.hide = () => {
  getRef(refs)?.hide();
};

Toast.top = ({ duration = SHORT, content }: Partial<ToastProps>) => {
  getRef(refs)?.show({ content, duration, position: 'top' });
};

Toast.middle = ({ duration = SHORT, content }: Partial<ToastProps>) => {
  getRef(refs)?.show({ content, duration, position: 'middle' });
};

Toast.bottom = ({ duration = SHORT, content }: Partial<ToastProps>) => {
  getRef(refs)?.show({ content, duration, position: 'bottom' });
};

Toast.process = (content = '加载中...') => {
  getRef(refs)?.show({
    content,
    duration: INFINITY,
    position: 'middle',
    mask: true,
    indicator: true,
  });
};

Toast.custom = (props: Omit<ToastProps, 'indicator'>) => {
  getRef(refs)?.show({
    duration: INFINITY,
    position: 'middle',
    mask: true,
    ...props,
    indicator: false,
  });
};

Toast.SHORT = SHORT;
Toast.LONG = LONG;
Toast.INFINITY = INFINITY;
