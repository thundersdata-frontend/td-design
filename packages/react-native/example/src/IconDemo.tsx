import React from 'react';
import { Icon, WingBlank } from '@td-design/react-native';

export default function IconDemo() {
  return (
    <WingBlank>
      <Icon name="user" />
      <Icon name="user" color="green" rounded shadow ratio={2} disabled />
      <Icon name="user" color="red" rounded shadow ratio={2} onPress={() => {}} />
    </WingBlank>
  );
}
