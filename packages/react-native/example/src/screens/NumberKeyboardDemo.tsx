import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { NumberKeyboard, WhiteSpace, Button, Text } from '@td-design/react-native';

const { modal } = NumberKeyboard;

export default () => {
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <WhiteSpace />
      <Text>数组键盘带小数点:</Text>
      <WhiteSpace />
      <NumberKeyboard
        onPress={e => {
          Alert.alert(e);
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      />
      <WhiteSpace />
      <Text>身份证键盘:</Text>
      <WhiteSpace />
      <NumberKeyboard
        type="IdCard"
        onPress={e => {
          Alert.alert(e);
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      />
      <WhiteSpace />
      <Text>数字键盘不带小数:</Text>
      <WhiteSpace />
      <NumberKeyboard
        type="integer"
        onPress={e => {
          Alert.alert(e);
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      />
      <WhiteSpace />
      <Text>弹窗键盘:</Text>
      <WhiteSpace />
      <Button
        title="keyboard"
        onPress={() =>
          modal({
            type: 'IdCard',
            onPress: e => {
              Alert.alert(e);
            },
            onDelete: () => {
              Alert.alert('delete');
            },
            onSubmit: () => {
              Alert.alert('submit');
            },
          })
        }
      />
    </ScrollView>
  );
};
