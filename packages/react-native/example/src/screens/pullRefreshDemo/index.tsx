import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';

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
    <PullRefresh refreshing={refreshing} onRefresh={handleRefresh} HeaderComponent={LottieHeader}>
      {/* <FlatList
        data={data}
        keyExtractor={item => (item as any).key}
        renderItem={({ item }) => (
          <View style={{ width: '100%', height: 100 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ borderWidth: 1, borderColor: 'red', height: 100, width: '100%' }}
              onPress={() => console.log(item)}
            >
              <Text>{(item as any).text}</Text>
            </TouchableOpacity>
          </View>
        )}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
      /> */}
      <ScrollView>
        {data.map(item => (
          <View key={item.text} style={{ width: '100%', height: 100 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ borderWidth: 1, borderColor: 'red', height: 100, width: '100%' }}
              onPress={() => console.log(item)}
            >
              <Text>{(item as any).text}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </PullRefresh>
  );
}
