import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import { PullRefresh, ImageHeader, Button } from '@td-design/react-native';

import { LottieHeader } from './LottieHeader';
import { useSharedValue } from 'react-native-reanimated';
import { ScreenProps } from 'src/common';

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

const { AnimateHeader } = ImageHeader;
export default function PullRefreshDemo(props: ScreenProps) {
  const [refreshing, setRefreshing] = useState(true);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleEndReached = () => {
    console.log('333');
  };

  const handleScrollY = (y: number) => {
    scrollY.value = y;
  };

  return (
    <Container>
      {/* <AnimateHeader
        scrollY={scrollY}
        scrollHeight={200}
        headerTitle="测试啊啊啊啊啊"
        headerLeft="返回"
        showLeft={props.navigation.canGoBack()}
        onPress={() => props.navigation.goBack()}
      /> */}
      <PullRefresh
        refreshing={refreshing}
        onRefresh={handleRefresh}
        // onScrollY={handleScrollY}
      >
        {/* <FlatList
          data={data}
          keyExtractor={item => (item as any).key}
          renderItem={({ item }) => (
            <View style={{ width: '100%', height: 100 }}>
              <TouchableOpacity
                activeOpacity={0.5}
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
                activeOpacity={0.5}
                style={{ borderWidth: 1, borderColor: 'red', height: 100, width: '100%' }}
                onPress={() => console.log(item)}
              >
                <Text>{(item as any).text}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </PullRefresh>
      <Button title="重新刷新" onPress={handleRefresh} />
    </Container>
  );
}
