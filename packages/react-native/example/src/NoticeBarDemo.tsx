import React from 'react';
import { NoticeBar, Text, WhiteSpace } from '@td-design/react-native';

export default function NoticeBarDemo() {
  return (
    <>
      <Text>默认</Text>
      <NoticeBar
        data={['我是通知我是通知我是通知我是通知我是通知我是通知222222222222222222222222222333333333333333333333333']}
      />
      <WhiteSpace />
      <Text>可关闭</Text>
      <NoticeBar data={['我是通知我是通知我是通知我是通知我是通知我是通知']} mode="close" />
      <WhiteSpace />
      <Text>可点击</Text>
      <NoticeBar
        data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
        mode="link"
        onPress={() => console.log('hello')}
      />
      <WhiteSpace />
      <Text>水平滚动 + 可点击</Text>
      <NoticeBar
        data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
        mode="link"
        animation
        onPress={() => console.log('hello')}
      />
      <WhiteSpace />
      <Text>水平滚动 + 可关闭</Text>
      <NoticeBar
        data={['我是通知我是通知我是通知我是通知我是通知我是通知']}
        mode="close"
        animation
        duration={1200}
        onPress={() => console.log('hello')}
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
    </>
  );
}
