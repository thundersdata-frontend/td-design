import React from 'react';

import { Portal } from '@td-design/react-native';

import { default as Password } from './Password';
import PasswordModal, { PasswordModalProps } from './PasswordModal';

function showPasswordModal(props: PasswordModalProps) {
  const key = Portal.add(
    <PasswordModal
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
}

export { Password, showPasswordModal };
