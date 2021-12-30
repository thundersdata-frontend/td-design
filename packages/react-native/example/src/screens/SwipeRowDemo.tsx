import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SwipeRow, PullToRefresh } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import Container from '../components/Container';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const { SwipeRowContextProvider } = SwipeRow;
export default () => {
  const [refreshing, setRefreshing] = useSafeState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <Container>
      <SwipeRowContextProvider>
        <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
          <FlatList
            data={[
              { id: 1, name: 'zhangsan' },
              { id: 2, name: 'lisi' },
            ]}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <SwipeRow
                anchor={item.id}
                actions={[
                  {
                    label: '警告',
                    onPress: () => console.log('warn'),
                    backgroundColor: '#4f7db0',
                  },
                ]}
                height={80}
              >
                <View style={styles.rowContent}>
                  <View style={styles.rowIcon} />
                  <View>
                    <Text style={styles.rowTitle}>{item.name}</Text>
                    <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
                  </View>
                </View>
              </SwipeRow>
            )}
          />
        </PullToRefresh>
      </SwipeRowContextProvider>
    </Container>
  );
};

const styles = StyleSheet.create({
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#73d4e3',
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
});
