import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { Toast } from '@td-design/react-native';

export default () => {
  const keyRef = useRef<number>(-1);

  return (
    <View>
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
            onClose: () => console.log('closed'),
            autoClose: false,
          }))
        }
      />
      <Button title="success" onPress={() => (keyRef.current = Toast.success({ content: '已成功添加到购物车' }))} />
      <Button title="fail" onPress={() => (keyRef.current = Toast.fail({ content: '对不起，操作失败' }))} />
      <Button title="loading" onPress={() => (keyRef.current = Toast.loading({ content: '正在加载' }))} />
      <Button title="submitting" onPress={() => (keyRef.current = Toast.submitting())} />
      <Button title="remove" onPress={() => Toast.remove(keyRef.current)} />
    </View>
  );
};
