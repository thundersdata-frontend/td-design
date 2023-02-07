import NiceModal from '@ebay/nice-modal-react';

import { PromptProps } from '../type';
import PromptContainer from './PromptContainer';

export default function prompt({ okText = '确定', cancelText = '取消', ...restProps }: PromptProps) {
  NiceModal.show(PromptContainer, { ...{ okText, cancelText, ...restProps } });
}
