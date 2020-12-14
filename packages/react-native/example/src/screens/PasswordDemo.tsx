import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { WingBlank, WhiteSpace, Password, Button } from '@td-design/react-native';

const { modal } = Password;

export default () => {
  const onDone = (password: string) => {
    Alert.alert(password + '');
  };
  return (
    <ScrollView>
      <WingBlank>
        <WhiteSpace />
        <Password onDone={onDone} />
        <WhiteSpace />
        <Button
          title="modal"
          onPress={() => {
            Password.modal({ title: '仿支付宝支付', onDone: onDone });
          }}
        />
      </WingBlank>
    </ScrollView>
  );
};
