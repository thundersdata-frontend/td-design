import NiceModal from '@ebay/nice-modal-react';

import { ConfirmProps } from '../type';
import ConfirmContainer from './ConfirmContainer';

export default function confirm({ okText = '确定', cancelText = '取消', ...restProps }: ConfirmProps) {
  NiceModal.show(ConfirmContainer, { ...{ okText, cancelText, ...restProps } });
}
