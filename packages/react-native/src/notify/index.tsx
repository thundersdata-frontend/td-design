import React from 'react';

import Portal from '../portal';
import NotifyContainer, { NotifyProps, NotifyType } from './NotifyContainer';

const SHORT = 3000;
const LONG = 5000;

let notifyKey = -1;
function remove(key: number) {
  Portal.remove(key);
  notifyKey = -1;
}

const notify = (
  { content = '', duration = SHORT, autoClose = true, onClose, onPress }: Partial<NotifyProps>,
  type: NotifyType
) => {
  remove(notifyKey);

  const props = {
    content,
    duration,
    type,
    autoClose,
    showClose: !!onClose,
  };
  Object.assign(props, {
    onClose: () => {
      onClose?.();
      remove(notifyKey);
    },
  });
  Object.assign(props, {
    onPress: () => {
      onPress?.();
      remove(notifyKey);
    },
  });
  notifyKey = Portal.add(<NotifyContainer {...props} />);

  return notifyKey;
};

export default {
  /** 自动关闭延时 */
  SHORT,
  LONG,
  info(props: Partial<NotifyProps>) {
    return notify({ ...props }, NotifyType.INFO);
  },
  success(props: Partial<NotifyProps>) {
    return notify({ ...props }, NotifyType.SUCCESS);
  },
  fail(props: Partial<NotifyProps>) {
    return notify({ ...props }, NotifyType.FAIL);
  },
  remove(key: number) {
    remove(key);
  },
};
