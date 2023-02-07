import NiceModal from '@ebay/nice-modal-react';

import NotifyContainer, { NotifyProps, NotifyType } from './NotifyContainer';

const SHORT = 3000;
const LONG = 5000;

const notify = (
  { content = '', duration = SHORT, autoClose = true, onClose, onPress }: Partial<NotifyProps>,
  type: NotifyType
) => {
  const props = {
    content,
    duration,
    type,
    autoClose,
    showClose: !!onClose,
    onClose,
    onPress,
  };

  NiceModal.show(NotifyContainer, props);
};

export default {
  /** 自动关闭延时 */
  SHORT,
  LONG,
  info(props: Partial<NotifyProps>) {
    notify({ ...props }, NotifyType.INFO);
  },
  success(props: Partial<Pick<NotifyProps, 'content' | 'duration'>>) {
    notify({ ...props }, NotifyType.SUCCESS);
  },
  fail(props: Partial<Pick<NotifyProps, 'content' | 'duration'>>) {
    notify({ ...props }, NotifyType.FAIL);
  },
};
