import React from 'react';
import { Result } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

export default function ResultDemo() {
  return (
    <Container>
      <ScrollView>
        <Result type="success" title="成功" content="你可以点击按钮查看更多哦" />
        <Result
          type="fail"
          title="成功"
          content="你可以点击按钮查看更多哦"
          actions={[
            { title: '返回首页', type: 'primary', onPress: () => {} },
            { title: '查看更多', type: 'primary', onPress: () => {} },
          ]}
        />
        <Result type="process" />
      </ScrollView>
    </Container>
  );
}
