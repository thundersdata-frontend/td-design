import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { NumberKeyboard, WhiteSpace, Button } from '@td-design/react-native';

const { numberKeyboard } = NumberKeyboard;

export default () => {
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <NumberKeyboard
        onPress={e => {
          Alert.alert(e + '');
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      />
      <WhiteSpace />
      <NumberKeyboard
        type="IdCard"
        onPress={e => {
          Alert.alert(e + '');
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      />
      <WhiteSpace />
      <NumberKeyboard
        type="integer"
        onPress={e => {
          Alert.alert(e + '');
        }}
        onDelete={() => {
          Alert.alert('delete');
        }}
        onSubmit={() => {
          Alert.alert('submit');
        }}
      />
      <WhiteSpace />

      <Button
        title="keyboard"
        onPress={() =>
          numberKeyboard({
            type: 'IdCard',
            onPress: e => {
              Alert.alert(e + '');
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
