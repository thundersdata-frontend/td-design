import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PullToRefresh, Center, Text } from '@td-design/react-native';
import Container from '../components/Container';
import { useSafeState } from '@td-design/rn-hooks';

export default function PullToRefreshDemo() {
  const [title, setTitle] = useSafeState('下拉刷新');
  const [refreshing, setRefreshing] = useSafeState(false);

  const onRefresh = () => {
    setTitle('刷新中');
    startRefreshing();
  };

  const startRefreshing = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const onTriggerToRefresh = (triggered: boolean) => {
    setTitle(triggered ? '释放刷新' : '下拉刷新');
  };

  return (
    <Container>
      <PullToRefresh
        minPullDistance={70}
        pullAnimateHeight={70}
        pullAnimateYValues={{ from: -50, to: 10 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onTriggerToRefresh={onTriggerToRefresh}
        contentComponent={
          <ScrollView>
            <Text style={styles.block1}>BLOCK 1</Text>
            <Text style={styles.block2}>BLOCK 2</Text>
            <Text style={styles.block3}>BLOCK 3</Text>
          </ScrollView>
        }
      >
        <RefreshHeader title={title} />
      </PullToRefresh>
    </Container>
  );
}

const RefreshHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <Center>
      <Text>{title}</Text>
      <Text>{getTime()}</Text>
    </Center>
  );
};

function getTime() {
  const now = new Date();
  return `${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
}

const styles = StyleSheet.create({
  block1: {
    margin: 2,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 230,
    height: 230,
    backgroundColor: '#9b9287',
  },
  block2: {
    margin: 2,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 230,
    height: 230,
    backgroundColor: '#9b9287',
  },
  block3: {
    margin: 2,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 230,
    height: 230,
    backgroundColor: '#9b9287',
  },
});
