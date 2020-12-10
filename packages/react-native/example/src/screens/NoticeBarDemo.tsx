import React from 'react';
import { NoticeBar, Text, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';
import { ScreenProps } from '../common';

export default function NoticeBarDemo({ navigation }: ScreenProps) {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>默认</Text>
        <NoticeBar data={['我是通知我是通知我是通知我是通知我是通知我是通知22222']} />
        <WhiteSpace />
        <Text>可关闭</Text>
        <NoticeBar data={['我是通知我是通知我是通知我是通知我是通知我是通知']} mode="close" />
        <WhiteSpace />
        <Text>可点击</Text>
        <NoticeBar
          data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
          mode="link"
          onPress={() => navigation.navigate('BoxDemo')}
        />
        <WhiteSpace />
        <Text>水平滚动 + 可点击</Text>
        <NoticeBar
          data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
          mode="link"
          animation
          duration={5000}
          onPress={() => navigation.navigate('BoxDemo')}
        />
        <WhiteSpace />
        <Text>水平滚动 + 可关闭</Text>
        <NoticeBar
          data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
          mode="close"
          animation
          duration={5000}
          onClose={() => console.log('hello')}
        />
        <WhiteSpace />
        <Text>垂直滚动</Text>
        <NoticeBar
          data={['1111', '2222', '3333', '4444']}
          mode="close"
          onPress={() => console.log('hello')}
          delay={3000}
          duration={200}
        />
      </ScrollView>
    </Container>
  );
}
