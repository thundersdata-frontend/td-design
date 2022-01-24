import React, { ReactText } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { helpers, PullToRefresh, Text } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import Container from '../components/Container';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

const ViewTypes = 'FULL';

export default function PullToRefreshDemo() {
  const [refreshing, setRefreshing] = useSafeState(false);

  const onRefresh = () => {
    console.log('onRefresh triggered');
    startRefreshing();
  };

  const startRefreshing = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const dataProvider = new DataProvider((r1: any, r2: any) => {
    return r1.id !== r2.id;
  });
  const listData = dataProvider.cloneWithRows(
    Array(100)
      .fill('')
      .map((_, index) => ({ id: index, name: `Cell${index}` }))
  );

  const layoutProvider = new LayoutProvider(
    () => ViewTypes,
    (type, dim) => {
      switch (type) {
        case ViewTypes:
          dim.width = helpers.deviceWidth;
          dim.height = 140;
          break;

        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  const rowRenderer = (type: ReactText, data: { id: number; name: string }) => {
    switch (type) {
      case ViewTypes:
        return (
          <TouchableOpacity style={styles.container} onPress={() => console.log(data)}>
            <Text>{data.name}</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const renderChildren = ({
    onScroll,
    onMomentumScrollEnd,
    scrollEnabled,
  }: {
    onScroll: () => void;
    onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEnabled: boolean;
  }) => {
    return (
      <RecyclerListView
        dataProvider={listData}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        onScroll={onScroll}
        scrollViewProps={{
          bounces: false,
          scrollEnabled,
          scrollEventThrottle: 16,
          onMomentumScrollEnd,
        }}
      />
    );
  };

  return (
    <Container>
      {/* <PullToRefresh onRefresh={onRefresh} refreshing={refreshing}>
        <ScrollView>
          {Array(12)
            .fill('')
            .map((_, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => console.log(index)}>
                  <Text style={styles.block}>BLOCK {index}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </PullToRefresh> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  block: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 230,
    height: 230,
    backgroundColor: '#9b9287',
    // backgroundColor: 'transparent',
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00a1f1',
  },
});
