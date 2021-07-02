import React, { useRef, useState } from 'react';
import { View, Button } from 'react-native';
import { Toast, Modal, Text, Box, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  const keyRef = useRef<number>(-1);
  const [visible1, setVisible1] = useState(false);

  return (
    <Container>
      <Button
        title="info"
        onPress={() => (keyRef.current = Toast.info({ content: '你收到一条抢购消息，请注意查收' }))}
      />
      <Button
        title="close"
        onPress={() =>
          (keyRef.current = Toast.info({ content: '你收到一条抢购消息，请注意查收', onClose: () => console.log(222) }))
        }
      />
      <Button
        title="press"
        onPress={() =>
          (keyRef.current = Toast.info({
            content: '你收到一条抢购消息，请注意查收',
            onPress: () => console.log(333),
            autoClose: false,
          }))
        }
      />
      <Button title="fail" onPress={() => (keyRef.current = Toast.fail({ content: '对不起，操作失败' }))} />
      <Button title="loading" onPress={() => (keyRef.current = Toast.loading({ content: '正在加载' }))} />
      <Button title="remove" onPress={() => Toast.remove(keyRef.current)} />

      <Button title="内容在底部" onPress={() => setVisible1(true)} />
      <Modal visible={visible1} onClose={() => setVisible1(false)} position="bottom">
        <Box height={190}>
          <Text variant="p0" color="gray500">
            我是内容
          </Text>
          <WhiteSpace />
          <Button title="success" onPress={() => (keyRef.current = Toast.success({ content: '已成功添加到购物车' }))} />
          <WhiteSpace />
          <Button title="submitting" onPress={() => (keyRef.current = Toast.submitting())} />
        </Box>
      </Modal>
    </Container>
  );
};
