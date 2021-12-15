import React from 'react';
import { CollapseText, helpers } from '@td-design/react-native';

import Container from '../components/Container';
import { ScrollView } from 'react-native';

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
    <Container>
      <ScrollView>
        <CollapseText
          text={text}
          defaultNumberOfLines={3}
          lineHeight={px(20)}
          // textStyle={{ color: 'red', fontSize: px(20), borderWidth: 1, borderColor: 'green' }}
          // expandStyle={{ color: 'gold', fontSize: px(14), paddingRight: px(12) }}
        />
      </ScrollView>
    </Container>
  );
};
