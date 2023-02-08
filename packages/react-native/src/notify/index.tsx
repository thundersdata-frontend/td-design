import { useMemoizedFn } from '@td-design/rn-hooks';
import { useRef } from 'react';
import React from 'react';

import { addNewRef, getRef, removeOldRef } from '../utils/ref-util';
import { LONG, SHORT } from './constant';
import NotifyRoot from './NotifyRoot';
import { NotifyProps } from './type';

export interface NotifyRef {
  show: (params: NotifyProps) => void;
}

type NotifyRefObj = {
  current: NotifyRef | null;
};

let refs: NotifyRefObj[] = [];

export default function Notify() {
  const notifyRef = useRef<NotifyRef | null>(null);

  const setRef = useMemoizedFn((ref: NotifyRef | null) => {
    if (ref) {
      notifyRef.current = ref;
      addNewRef(refs, ref);
    } else {
      removeOldRef(refs, notifyRef.current);
    }
  });

  return <NotifyRoot ref={setRef} />;
}
Notify.displayName = 'Notify';

Notify.SHORT = SHORT;
Notify.LONG = LONG;

const defaultProps = {
  content: '',
  duration: SHORT,
  autoClose: true,
};

Notify.success = (props: NotifyProps) => {
  getRef(refs)?.show({ ...defaultProps, ...props, type: 'success' });
};

Notify.fail = (props: NotifyProps) => {
  getRef(refs)?.show({ ...defaultProps, ...props, type: 'fail' });
};

Notify.info = (props: NotifyProps) => {
  getRef(refs)?.show({ ...defaultProps, ...props, type: 'info' });
};
