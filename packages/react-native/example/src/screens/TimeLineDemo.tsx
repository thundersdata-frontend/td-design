import React from 'react';
import { TimeLine, WhiteSpace, WingBlank, Icon, Text } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView, Image } from 'react-native';

export default () => {
  const steps = [
    { title: '第一步', description: '测试' },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];
  const steps2 = [
    { title: '第一步', description: '测试', icon: <Icon name="user" /> },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];
  const steps3 = [
    { title: '第一步', description: '测试', stepRender: <Text>111111111111</Text> },
    {
      title: '第二步',
      description: '测试',
      stepRender: (
        <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={require('../../assets/images/img-01.jpg')} />
      ),
    },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];
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
      <ScrollView style={{ flex: 1 }}>
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <Text>竖向:</Text>
          <TimeLine steps={steps} current={2} height={200} />
          <WhiteSpace />
          <WhiteSpace />
          <Text>自定义render:</Text>
          <TimeLine steps={steps3} current={2} height={200} />
          <WhiteSpace />
          <WhiteSpace />
          <Text>自定义icon:</Text>
          <TimeLine steps={steps2} current={2} height={200} />
          <WhiteSpace />
          <WhiteSpace />
          <Text>自定义颜色:</Text>
          <TimeLine steps={steps4} current={2} height={200} />
        </WingBlank>
      </ScrollView>
    </Container>
  );
};
