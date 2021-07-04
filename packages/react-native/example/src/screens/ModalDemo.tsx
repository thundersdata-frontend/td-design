import React, { useState } from 'react';
import { Box, Modal, Text, Toast, Accordion } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

export default function ModalDemo() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const content = (
    <Box height={190}>
      <Accordion
        activeSections={[2]}
        sections={[
          { title: '我是标题', content: '11111111111111111' },
          {
            title: '我是标题',
            content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
          },
          {
            title: '我是标题',
            content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是`,
          },
        ]}
      />
      <Button title="toast" onPress={() => Toast.loading({ content: '123' })} />
    </Box>
  );

  return (
    <Container hasHeader={false}>
      <Box style={{ borderWidth: 1, borderColor: 'red', flex: 1 }}>
        <Button title="内容在底部" onPress={() => setVisible1(true)} />
        <Button title="内容在中间" onPress={() => setVisible2(true)} />
        <Button title="内容全屏" onPress={() => setVisible3(true)} />

        <Modal visible={visible1} onClose={() => setVisible1(false)} position="bottom">
          {content}
        </Modal>
        <Modal
          visible={visible2}
          onClose={() => setVisible2(false)}
          position="center"
          bodyContainerStyle={{ marginHorizontal: 20, borderRadius: 10 }}
        >
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
