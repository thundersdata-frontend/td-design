import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PullRefresh } from '@td-design/react-native';
import { LottieHeader } from './LottieHeader';

interface DataItem {
  key: string;
  text: string;
  on: boolean;
}
const data: DataItem[] = new Array(50).fill('').map((_, i) => ({
  key: `data-${i}`,
  text: `number: ${i}`,
  on: false,
}));

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function PullRefreshDemo() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleEndReached = () => {
    console.log('333');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PullRefresh
        refreshing={refreshing}
        onRefresh={handleRefresh}
        //HeaderComponent={LottieHeader}
      >
        {/* <Animated.ScrollView style={{ flex: 1 }}>
          {data.map(item => (
            <View key={item.key} style={{ width: '100%', height: 100, borderWidth: 1, borderColor: 'red' }}>
              <Text>{item.text}</Text>
            </View>
          ))}
        </Animated.ScrollView> */}
        <AnimatedFlatList
          data={data}
          keyExtractor={item => (item as any).key}
          renderItem={({ item }) => (
            <View style={{ width: '100%', height: 100, borderWidth: 1, borderColor: 'red' }}>
              <Text>{(item as any).text}</Text>
            </View>
          )}
          onEndReachedThreshold={0.1}
          onEndReached={handleEndReached}
        />
      </PullRefresh>
    </SafeAreaView>
  );
}
