import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SwipeRow } from '@td-design/react-native';
import { Text } from 'react-native';

export default () => {
  return (
    <FlatList
      data={[
        { id: 1, name: 'zhangsan' },
        { id: 2, name: 'lisi' },
      ]}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <SwipeRow
          leftActions={[
            {
              label: '确认',
              onPress: () => console.log('confirm'),
              backgroundColor: '#2f9a5d',
            },
            {
              label: 'OK',
              onPress: () => console.log('ok'),
              backgroundColor: 'gold',
            },
          ]}
          rightActions={[
            {
              label: '删除',
              onPress: () => console.log('remove'),
              backgroundColor: '#f8a024',
            },
            {
              label: '警告',
              onPress: () => console.log('warn'),
              backgroundColor: '#4f7db0',
            },
          ]}
          height={100}
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
  );
};

const styles = StyleSheet.create({
  rowContent: {
    flex: 1,
    height: 100,
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
