import React from 'react';
import { Flow, WhiteSpace, Image, Text } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  // 基本
  const steps = [
    { title: '第一步', description: '测试' },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
    { title: '第五步', description: '测试2' },
  ];
  // 自定义render
  const steps3 = [
    {
      title: '第一步',
      description: '测试',
      stepRender: (
        <Text variant="p0" color="gray500">
          111111111111
        </Text>
      ),
    },
    {
      title: '第二步',
      description: '测试',
      stepRender: (
        <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={require('../../assets/images/img-01.jpg')} />
      ),
    },
    { title: '第三步', description: '测试', label: '1' },
    { title: '第四步', description: '测试' },
  ];
  return (
    <Container>
      <Text>指定进度:</Text>
      <WhiteSpace />
      <Flow steps={steps} current={3} />
      <WhiteSpace />
      <Text>当前状态:</Text>
      <WhiteSpace />
      <Flow steps={steps} current={3} status="error" />
      <WhiteSpace />
      <Text>自定义render:</Text>
      <WhiteSpace />
      <Flow steps={steps3} current={2} size={50} />
      <WhiteSpace />
    </Container>
  );
};
