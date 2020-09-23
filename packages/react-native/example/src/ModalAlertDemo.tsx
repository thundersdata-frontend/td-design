import React from 'react';
import { Modal } from '@td-design/react-native';
import { Button } from 'react-native';

export default function ModalAlertDemo() {
  const handlePress = () => {
    Modal.alert({
      title: '我是弹窗',
      content: '我是内容',
    });
  };
  return <Button title="弹窗" onPress={handlePress} />;
}
