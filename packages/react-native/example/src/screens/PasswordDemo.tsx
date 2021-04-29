import React from 'react';
import { ScrollView, Alert, Text } from 'react-native';
import { WingBlank, WhiteSpace, Password, Button } from '@td-design/react-native';

export default () => {
  const onDone = (password: string) => {
    Alert.alert(password + '');
  };
  return (
    <ScrollView>
      <WingBlank>
        <WhiteSpace />
        <Text>基本:</Text>
        <WhiteSpace />
        <Password onDone={onDone} />
        <WhiteSpace />
        <Text>显示光标:</Text>
        <WhiteSpace />
        <Password onDone={onDone} showCursor />
        <WhiteSpace />
        <Text>弹窗:</Text>
        <WhiteSpace />
        <Button
          title="modal"
          onPress={() => {
            Password.modal({ title: '仿支付宝支付', onDone: onDone });
          }}
        />
        <WhiteSpace />
        <Text>弹窗显示光标:</Text>
        <WhiteSpace />
        <Button
          title="modal"
          onPress={() => {
            Password.modal({ title: '仿支付宝支付', onDone: onDone, showCursor: true });
          }}
        />
      </WingBlank>
    </ScrollView>
  );
};
