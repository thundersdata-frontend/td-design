import React from 'react';

import { useSafeState } from '@td-design/rn-hooks';

import Portal from '../../portal';
import ModalView from '../Modal/ModalView';
import { ImperativeModalChildrenProps, ModalProps } from '../type';

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

const ModalContent = ({
  children,
  ...props
}: Omit<ModalProps, 'visible' | 'onClose'> & { children: React.ReactElement<ImperativeModalChildrenProps<{}>> }) => {
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
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            // Add any props you want to pass to the child here
            closeModal() {
              setVisible(false);
            },
          })
        : null}
    </ModalView>
  );
};
