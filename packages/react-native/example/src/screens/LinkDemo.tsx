import React from 'react';
import { Center, Button, Link } from '@td-design/react-native';

import Container from '../components/Container';

export default function LinkDemo() {
  return (
    <Container>
      <Center>
        <Button title="发送邮件" onPress={() => Link.email('929483857@qq.com')} />
        {/* <Button title="打开系统设置" onPress={() => Link.settings()} /> */}
        {/* <Button title="发送短信" onPress={() => Link.sms('+8617681820821')} /> */}
        {/* <Button title="打电话" onPress={() => Link.call('+8617681820821')} /> */}
        {/* <Button title="打开网址" onPress={() => Link.url('https://www.baidu.com/')} /> */}
      </Center>
    </Container>
  );
}
