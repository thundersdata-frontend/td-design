import React, { PropsWithChildren } from 'react';

import { useSafeState } from '@td-design/rn-hooks';

import Portal from '../../portal';
import ModalView from '../Modal/ModalView';
import { ModalProps } from '../type';

export default function show(
  comp: React.ReactElement,
  props?: Omit<ModalProps, 'onAnimationEnd' | 'visible' | 'onClose'>
) {
  const key = Portal.add(
    <ModalContent
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    >
      {comp}
    </ModalContent>
  );
}

const ModalContent = ({ children, ...props }: PropsWithChildren<Omit<ModalProps, 'visible' | 'onClose'>>) => {
  const [visible, setVisible] = useSafeState(true);

  return (
    <ModalView
      position="center"
      maskVisible
      maskClosable
      animationType="slide"
      {...props}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      {children}
    </ModalView>
  );
};
