import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { PullToRefresh, Text } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import Container from '../components/Container';
import { LottieHeader } from '../components/LottieHeader';

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
      <PullToRefresh onRefresh={onRefresh} refreshing={refreshing} HeaderComponent={LottieHeader}>
        <FlatList
          data={Array(12).fill('')}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => console.log(index)}>
              <Text style={styles.block}>BLOCK #{index}</Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      </PullToRefresh>
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
});
