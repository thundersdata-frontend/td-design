import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Container from '../components/Container';
import _ from 'lodash';

export default () => {
  const content = useMemo(
    () => (
      <>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red', backgroundColor: 'white' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
        <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
          <Text>123123</Text>
        </View>
      </>
    ),
    []
  );

  return <Container>{content}</Container>;
};
