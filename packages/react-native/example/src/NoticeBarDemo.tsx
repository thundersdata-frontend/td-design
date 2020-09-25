import React from 'react';
import { NoticeBar, Text, WhiteSpace } from '@td-design/react-native';

export default function NoticeBarDemo() {
  return (
    <>
      <Text>默认</Text>
      <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知222222222222222222222222222333333333333333333333333" />
      <WhiteSpace />
      <Text>可关闭</Text>
      <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知" mode="close" />
      <WhiteSpace />
      <Text>可点击</Text>
      <NoticeBar
        text="我是通知我是通知我是通知我是通知我是通知我是通知"
        mode="link"
        onPress={() => console.log('hello')}
      />
      <WhiteSpace />
      <Text>水平滚动 + 可点击</Text>
      <NoticeBar
        text="我是通知我是通知我是通知我是通知111111111111111aa222222"
        mode="link"
        onPress={() => console.log('hello')}
        animation={true}
        direction="rightToLeft"
      />
      <WhiteSpace />
      <Text>上下滚动 + 可点击</Text>
      <NoticeBar
        text="我是通知我是通知我是通知我是通知111111111111111aa222222"
        mode="link"
        onPress={() => console.log('hello')}
        animation={true}
        direction="bottomToTop"
      />
      <WhiteSpace />
      <Text>上下滚动 + 关闭</Text>
      <NoticeBar
        text="我是通知我是通知我是通知我是通知111111111111111aa222222"
        mode="close"
        onPress={() => console.log('hello')}
        animation={true}
        direction="bottomToTop"
      />
    </>
  );
}
