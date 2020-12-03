import React from 'react';
import { CollapseText, helpers } from '@td-design/react-native';
import { View } from 'react-native';

const { px } = helpers;

export default () => {
  const text = `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
  我是内容我是内容我是内容我是内容我是内容我是内容我是内容`;
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {/* <CollapseText text={text} defaultNumberOfLines={3} /> */}
      <CollapseText
        text={text}
        defaultNumberOfLines={3}
        lineHeight={px(20)}
        textStyle={{ color: 'red', fontSize: px(16) }}
        textContainerStyle={{ marginHorizontal: px(10) }}
        expandStyle={{ color: 'gold', fontSize: px(16) }}
      />
    </View>
  );
};
