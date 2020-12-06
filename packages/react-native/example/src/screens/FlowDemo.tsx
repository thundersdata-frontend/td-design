import React from 'react';
import { Flow, WhiteSpace, WingBlank, Icon, Text } from '@td-design/react-native';
import Container from '../components/Container';
import { View, ScrollView, Image } from 'react-native';

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
      processrColor: 'green',
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
          <Text>横向:</Text>
          <Flow steps={steps} current={2}></Flow>
          <WhiteSpace />
          <View style={{ width: '50%' }}>
            <Flow steps={steps} current={3} status="error"></Flow>
          </View>
          <WhiteSpace />
          <Text>自定义icon:</Text>
          <Flow steps={steps2} current={2}></Flow>
          <WhiteSpace />
          <Text>自定义render:</Text>
          <Flow steps={steps3} current={2} size={50}></Flow>
          <WhiteSpace />
          <Text>自定义样式</Text>
          <Flow steps={steps4} current={2} size={50}></Flow>
          <WhiteSpace />
          <Text>竖向:</Text>
          <Flow steps={steps} current={1} direction="vertical" height={200}></Flow>
        </WingBlank>
      </ScrollView>
    </Container>
  );
};
