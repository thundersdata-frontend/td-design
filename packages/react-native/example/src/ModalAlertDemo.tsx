import React from 'react';
import { Icon, Modal } from '@td-design/react-native';
import { Button } from 'react-native';

export default function ModalAlertDemo() {
  const handlePress = () => {
    Modal.alert({
      icon: <Icon name="exclamationcircle" color="orange" size={80} />,
      title: '我是弹窗',
      content: '我是内容',
      actions: [
        { text: '确定', onPress: () => console.log(1) },
        { text: '取消', onPress: () => console.log(2), style: { color: 'red' } },
      ],
    });
  };
  return <Button title="弹窗" onPress={handlePress} />;
}
