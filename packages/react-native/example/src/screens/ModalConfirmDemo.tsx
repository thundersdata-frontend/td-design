import React from 'react';
import { Icon, Modal } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalConfirmDemo() {
  const handlePress = () => {
    Modal.confirm({
      title: '我是弹窗',
      content: '我是内容',
    });
  };
  return (
    <Container>
      <Button title="弹窗" onPress={handlePress} />
    </Container>
  );
}
