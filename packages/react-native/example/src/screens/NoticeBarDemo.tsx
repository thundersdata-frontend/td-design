import React from 'react';
import { NoticeBar, Text, WhiteSpace, Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';
import { ScreenProps } from '../common';

export default function NoticeBarDemo({ navigation }: ScreenProps) {
  return (
    <Container>
      <ScrollView>
        <NoticeBar height={60} text="我是通知我是通知我是通知我是通知我是通知我是通知22222" />
        {/* <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知" mode="close" /> */}
        {/* <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知"
          mode="link"
          onPress={() => navigation.navigate('BoxDemo')}
        /> */}
        {/* <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知"
          mode="link"
          onPress={() => navigation.navigate('BoxDemo')}
          animation
        /> */}
        {/* <NoticeBar
          text="我是通知我是通知我是通知我是通知我是通知我是通知"
          mode="close"
          animation
          onClose={() => alert('hello')}
        /> */}
      </ScrollView>
    </Container>
  );
}
