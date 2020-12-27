import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Timeline, WingBlank, WhiteSpace, Icon } from '@td-design/react-native';
/**  TODO 从@td-design/react-native 导出props  */
import { StepProps } from '../../time-line';

export default () => {
  const steps = [
    { title: '第一步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第二步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10' },
  ];
  const steps1: StepProps[] = [
    {
      title: '第一步',
      description: '测试',
      date: '12-12',
      time: '10:10',
      iconRender: <Icon name="user"></Icon>,
    },
    {
      title: '第二步',
      description: '测试',
      date: '12-12',
      time: '10:10',
      contentRender: <Text>111</Text>,
    },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10', leftRender: <Text>222</Text> },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10', status: 'error' },
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      <WhiteSpace />
      <WingBlank>
        <WhiteSpace />
        <Text>基本:</Text>
        <WhiteSpace />
        <Timeline steps={steps} />
        <WhiteSpace />
        <Text>可以滚动:</Text>
        <WhiteSpace />
        <View style={{ height: 100 }}>
          <Timeline steps={steps} />
        </View>
        <WhiteSpace />
        <Text>向下:</Text>
        <WhiteSpace />
        <Timeline steps={steps} direction="down" />
        <Text>自定义节点：</Text>
        <Timeline steps={steps1} />
      </WingBlank>
    </ScrollView>
  );
};
