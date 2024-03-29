import React from 'react';

import Portal from '../../portal';
import { PromptProps } from '../type';
import PromptContainer from './PromptContainer';

export default function prompt({ okText = '确定', cancelText = '取消', ...restProps }: PromptProps) {
  const key = Portal.add(
    <PromptContainer
      {...{ okText, cancelText, ...restProps }}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
}
