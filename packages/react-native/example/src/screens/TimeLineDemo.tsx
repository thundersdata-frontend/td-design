import React from 'react';
import { ScrollView, Text } from 'react-native';
import { TimeLine, WingBlank, WhiteSpace, Icon } from '@td-design/react-native';

export default () => {
  const steps = [
    { title: '第一步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第二步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10' },
  ];
  const steps1 = [
    { title: '第一步', description: '测试', date: '12-12', time: '10:10', iconRender: <Icon name="user"></Icon> },
    { title: '第二步', description: '测试', date: '12-12', time: '10:10', contentRender: <Text>111</Text> },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10', leftRender: <Text>222</Text> },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10' },
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      <WhiteSpace />
      <WingBlank>
        <Text>标准：</Text>
        <TimeLine steps={steps} />
        <Text>自定义：</Text>
        <TimeLine steps={steps1} />
        <TimeLine steps={steps} />
        <TimeLine steps={steps} />
      </WingBlank>
    </ScrollView>
  );
};
