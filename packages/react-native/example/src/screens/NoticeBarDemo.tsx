import React from 'react';
import { NoticeBar, Text, WhiteSpace, Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';
import { ScreenProps } from '../common';

export default function NoticeBarDemo({ navigation }: ScreenProps) {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <WhiteSpace />
        <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知22222" />
        <WhiteSpace />
        <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知"
          mode="close"
          style={{ backgroundColor: '#FFF7E3' }}
        />
        <WhiteSpace />
        <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知"
          mode="link"
          onPress={() => navigation.navigate('BoxDemo')}
          style={{ backgroundColor: '#FFF7E3' }}
        />
        <WhiteSpace />
        <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知33333"
          mode="link"
          onPress={() => navigation.navigate('BoxDemo')}
          style={{ backgroundColor: '#FFF7E3' }}
          animation
        />
        <WhiteSpace />
        <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知44444"
          mode="close"
          animation
          onClose={() => alert('hello')}
          style={{ backgroundColor: '#FFF7E3' }}
        />
      </ScrollView>
    </Container>
  );
}
