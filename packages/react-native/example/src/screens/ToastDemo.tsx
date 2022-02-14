import React, { useRef, useState } from 'react';
import { Button } from 'react-native';
import { Toast, Modal, Text, Box, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  const keyRef = useRef<number>(-1);
  const [visible1, setVisible1] = useState(false);

  return (
    <Container>
      <Button
        title="top"
        onPress={() => (keyRef.current = Toast.top({ content: '提示内容1111', duration: Toast.LONG }))}
      />
      {/* <Button title="middle" onPress={() => (keyRef.current = Toast.middle({ content: '提示内容222222' }))} /> */}
      {/* <Button title="bottom" onPress={() => (keyRef.current = Toast.bottom({ content: '提示内容333333333' }))} /> */}
      {/* <Button title="loading" onPress={() => (keyRef.current = Toast.process())} /> */}
      {/* <Button title="remove" onPress={() => Toast.remove(keyRef.current)} /> */}

      {/* <Button title="弹窗" onPress={() => setVisible1(true)} />
      <Modal visible={visible1} onClose={() => setVisible1(false)} position="bottom">
        <Box height={190}>
          <Text variant="p0" color="gray500">
            我是内容
          </Text>
          <WhiteSpace />
          <Button title="submitting" onPress={() => (keyRef.current = Toast.process('提交中...'))} />
        </Box>
      </Modal> */}
    </Container>
  );
};
