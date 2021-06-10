import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import HuaweiRefreshControl from './components/HuaweiRefreshControl';

const data = [
  'row 1',
  'row 2',
  'row 3',
  'row 4',
  'row 5',
  'row 6',
  'row 7',
  'row 8',
];

/**
 * 使用自定义RefreshControl效果
 * @returns
 */
export function FlatListExample2() {
  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={item => item}
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{item}</Text>
          </View>
        )}
        renderScrollComponent={props => (
          <ScrollView
            style={{flex: 1}}
            {...props}
            refreshControl={<HuaweiRefreshControl />}
          />
        )}
      />
    </View>
  );
}
