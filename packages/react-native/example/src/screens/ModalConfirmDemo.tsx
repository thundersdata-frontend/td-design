import React from 'react';
import { Image, Modal, helpers } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';
const { px } = helpers;

export default function ModalConfirmDemo() {
  const handlePress = () => {
    Modal.confirm({
      icon: (
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: px(55), height: px(54), marginTop: px(36) }}
        />
      ),
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
