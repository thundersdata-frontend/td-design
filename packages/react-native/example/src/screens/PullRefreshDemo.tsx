import React, { useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import Container from '../components/Container';
import _ from 'lodash';
import { SpringScrollView, ChineseNormalHeader, CommonLottieHeader } from 'rn-spring-scrollview';

export default () => {
  const scrollViewRef = useRef<SpringScrollView>(null);

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

  return (
    <Container>
      <SpringScrollView
        ref={scrollViewRef}
        refreshHeader={CommonLottieHeader}
        onRefresh={() => {
          console.log('onRefresh');
          setTimeout(() => scrollViewRef.current?.endRefresh(), 1000);
        }}
      >
        {content}
      </SpringScrollView>
    </Container>
  );
};
