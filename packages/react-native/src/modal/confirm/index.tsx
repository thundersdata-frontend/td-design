import React from 'react';
import Portal from '../../portal';
import { ConfirmProps } from '../type';
import ConfirmContainer from './ConfirmContainer';

export default function confirm({ okText = '确定', cancelText = '取消', ...restProps }: ConfirmProps) {
  const key = Portal.add(
    <ConfirmContainer {...restProps} {...{ okText, cancelText }} afterClose={() => Portal.remove(key)} />
  );

  return key;
}
