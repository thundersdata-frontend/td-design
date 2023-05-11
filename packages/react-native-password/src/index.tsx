import React from 'react';

import { Portal } from '@td-design/react-native';

import Password from './Password';
import PasswordModal, { PasswordModalProps } from './PasswordModal';

function modal(props: PasswordModalProps) {
  return Portal.add(<PasswordModal {...props} />);
}

export default Object.assign(Password, { modal });
