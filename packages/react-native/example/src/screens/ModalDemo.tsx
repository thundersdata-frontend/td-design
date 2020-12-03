import React, { useState } from 'react';
import { Box, Modal, Text } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalDemo() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const content = (
    <Box>
      <Text variant="primaryBody">我是内容</Text>
    </Box>
  );

  return (
    <Container>
      <Box>
        <Button title="内容在底部" onPress={() => setVisible1(true)} />
        <Button title="内容在中间" onPress={() => setVisible2(true)} />
        <Button title="内容全屏" onPress={() => setVisible3(true)} />

        <Modal visible={visible1} onClose={() => setVisible1(false)} position="bottom">
          {content}
        </Modal>
        <Modal visible={visible2} onClose={() => setVisible2(false)} position="center">
          {content}
        </Modal>
        <Modal visible={visible3} onClose={() => setVisible3(false)} position="fullscreen">
          {content}
          <Button title="关闭" onPress={() => setVisible3(false)} />
        </Modal>
      </Box>
    </Container>
  );
}
