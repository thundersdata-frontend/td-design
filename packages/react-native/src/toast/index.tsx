import { useMemoizedFn } from '@td-design/rn-hooks';
import React, { useRef } from 'react';

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

function addNewRef(newRef: ToastRef) {
  refs.push({
    current: newRef,
  });
}

function removeOldRef(oldRef: ToastRef | null) {
  refs = refs.filter(r => r.current !== oldRef);
}

export default function Toast() {
  const toastRef = useRef<ToastRef | null>(null);

  const setRef = useMemoizedFn((ref: ToastRef | null) => {
    if (ref) {
      toastRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(toastRef.current);
    }
  });

  return <ToastRoot ref={setRef} />;
}
Toast.displayName = 'Toast';

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Toast.hide = () => {
  getRef()?.hide();
};

Toast.top = ({ duration = SHORT, content = '' }: Partial<ToastProps>) => {
  getRef()?.show({ content, duration, position: 'top' });
};

Toast.middle = ({ duration = SHORT, content = '' }: Partial<ToastProps>) => {
  getRef()?.show({ content, duration, position: 'middle' });
};

Toast.bottom = ({ duration = SHORT, content = '' }: Partial<ToastProps>) => {
  getRef()?.show({ content, duration, position: 'bottom' });
};

Toast.process = (content = '加载中...') => {
  getRef()?.show({
    content,
    duration: INFINITY,
    position: 'middle',
    mask: true,
    indicator: true,
  });
};

Toast.SHORT = SHORT;
Toast.LONG = LONG;
Toast.INFINITY = INFINITY;
