import React, { useMemo, useRef, useState } from 'react';
import { PullRefresh } from '@td-design/react-native';
import { ActivityIndicator, Text, View } from 'react-native';
import Container from '../components/Container';
import LottieView from 'lottie-react-native';
import _ from 'lodash';
import { SpringScrollView } from '@td-design/react-native-awesome-scrollview';

const loadingAnimation = require('../../assets/loading.json');

export default () => {
  const [progress, setProgress] = useState(0);
  const lottieViewRef = useRef<LottieView>(null);

  const handleRefresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  };

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
      </>
    ),
    []
  );

  return (
    <Container>
      <SpringScrollView>{content}</SpringScrollView>
      {/* FlatList + Lottie Demo */}
      {/* <PullRefresh<{ id: number; label: string }>
        scrollComponent="FlatList"
        refreshComponent={
          <LottieView
            style={{ height: 60 }}
            ref={lottieViewRef}
            source={loadingAnimation}
            progress={progress}
            autoSize
            loop
          />
        }
        onRefresh={async () => {
          lottieViewRef.current!.play();
          await handleRefresh();
          lottieViewRef.current!.reset();
        }}
        onProgress={setProgress}
        data={Array(10)
          .fill('')
          .map((_, index) => ({ id: index + 1, label: `hahaha${index + 1}` }))}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red', backgroundColor: 'white' }}>
            <Text>{item.label}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      /> */}
      {/* ScrollView + Lottie Demo */}
      {/* <PullRefresh
        refreshComponent={
          <LottieView
            style={{ height: 60 }}
            ref={lottieViewRef}
            source={loadingAnimation}
            progress={progress}
            autoSize
            loop
          />
        }
        onRefresh={async () => {
          lottieViewRef.current!.play();
          await handleRefresh();
          lottieViewRef.current!.reset();
        }}
        onProgress={setProgress}
      >
        {content}
      </PullRefresh> */}
      {/* ScrollView + 普通组件 示例 */}
      {/* <PullRefresh
        refreshComponent={
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        }
        onRefresh={handleRefresh}
        onProgress={setProgress}
      >
        {content}
      </PullRefresh> */}
    </Container>
  );
};
