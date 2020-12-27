import React, { useState } from 'react';
import { Input, Modal, Text, WhiteSpace } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalPromptDemo() {
  const [value, setValue] = useState<string>();

  const handlePress = () => {
    Modal.prompt({
      title: '我是弹窗',
      content: '我是内容',
      input: <Input placeholder="请输入" />,
      onOk: setValue,
      onCancel: () => console.log(123),
    });
  };
  return (
    <Container>
      <Button title="弹窗" onPress={handlePress} />
      <WhiteSpace />
      <Text>您输入的是：{value}</Text>
    </Container>
  );
}
