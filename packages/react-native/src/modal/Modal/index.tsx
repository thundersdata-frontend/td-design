import React, { PropsWithChildren } from 'react';

import Portal from '../../portal';
import { ModalProps } from '../type';
import ModalView from './ModalView';

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const {
    animationType = 'slide',
    animationDuration = 300,
    visible = false,
    maskClosable = true,
    maskVisible = true,
    position = 'bottom',
    children,
    ...rest
  } = props;

  return (
    <Portal>
      <ModalView
        {...rest}
        visible={visible}
        animationType={animationType}
        animationDuration={animationDuration}
        maskClosable={maskClosable}
        maskVisible={maskVisible}
        position={position}
      >
        {children}
      </ModalView>
    </Portal>
  );
}
