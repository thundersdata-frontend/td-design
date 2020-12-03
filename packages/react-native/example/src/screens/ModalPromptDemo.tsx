import React from 'react';
import { Input, Modal } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalPromptDemo() {
  const handlePress = () => {
    Modal.prompt({
      title: '我是弹窗',
      content: '我是内容',
      input: <Input placeholder="请输入" />,
      onOk: value => console.log(value),
      onCancel: () => console.log(123),
    });
  };
  return (
    <Container>
      <Button title="弹窗" onPress={handlePress} />
    </Container>
  );
}
