import React from 'react';

import { Portal } from '@td-design/react-native';

import Password from './Password';
import PasswordModal, { PasswordModalProps } from './PasswordModal';

function modal(props: PasswordModalProps) {
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

export default Object.assign(Password, { modal });
