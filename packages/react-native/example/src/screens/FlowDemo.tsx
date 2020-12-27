import React from 'react';
import { Flow, WhiteSpace, WingBlank, Icon, Text } from '@td-design/react-native';
import Container from '../components/Container';
import { View, ScrollView, Image } from 'react-native';

export default () => {
  // 基本
  const steps = [
    { title: '第一步', description: '测试' },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];
  // 自定义icon
  const steps2 = [
    { title: '第一步', description: '测试', icon: <Icon name="user" /> },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];
  // 自定义render
  const steps3 = [
    { title: '第一步', description: '测试', stepRender: <Text>111111111111</Text> },
    {
      title: '第二步',
      description: '测试',
      stepRender: (
        <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={require('../../assets/images/img-01.jpg')} />
      ),
    },
    { title: '第三步', description: '测试', label: '1' },
    { title: '第四步', description: '测试' },
  ];
  // 自定义样式
  const steps4 = [
    {
      title: '第一步',
      description: '测试',
      activeColor: 'green',
    },
    {
      title: '第二步',
      description: '测试',
    },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];
  return (
    <Container>
      <ScrollView>
        <WhiteSpace />
        <WingBlank>
          <Text>基本:</Text>
          <Flow steps={steps} />
          <WhiteSpace />
          <Text>指定进度:</Text>
          <WhiteSpace />
          <Flow steps={steps} current={3} />
          <WhiteSpace />
          <Text>当前状态:</Text>
          <WhiteSpace />
          <Flow steps={steps} current={3} status="error" />
          <WhiteSpace />
          <Text>自定义icon:</Text>
          <Flow steps={steps2} current={2} />
          <WhiteSpace />
          <Text>自定义render:</Text>
          <WhiteSpace />
          <Flow steps={steps3} current={2} size={50} />
          <WhiteSpace />
          <Text>自定义样式:</Text>
          <WhiteSpace />
          <Flow steps={steps4} current={2} size={50} />
        </WingBlank>
      </ScrollView>
    </Container>
  );
};
