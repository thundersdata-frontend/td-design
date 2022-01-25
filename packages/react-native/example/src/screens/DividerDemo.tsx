import React from 'react';
import { Flex, Box, Divider, Text, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';
import { helpers } from '@td-design/react-native';

const { px } = helpers;

export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本</Text>
        <Divider type="dashed" dashGap={px(30)} dashLength={px(20)} dashThickness={px(2)} />
        <Text>我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本</Text>
        {/* <Divider type="dashed" />
        <WhiteSpace />
        <Divider type="dashed" dashGap={px(30)} dashLength={px(20)} dashThickness={px(12)} />
        <WhiteSpace /> */}
        {/* <Flex>
          <Text variant="p0" color="primary200">
            酒店
          </Text>
          <Divider axis="vertical" height={px(20)} />
          <Text variant="p0" color="primary200">
            商圈
          </Text>
        </Flex> */}
        {/* <Flex height={px(100)} alignItems="center">
          <Text variant="p0" color="primary200">
            酒店
          </Text>
          <Divider axis="vertical" height={px(100)} type="dashed" dashThickness={px(10)} dashGap={px(4)} />
          <Text variant="p0" color="primary200">
            商圈
          </Text>
        </Flex> */}
        {/* <Flex height={40}>
          <Text variant="p0" color="primary200">
            酒店
          </Text>
          <Divider axis="vertical" height={px(30)} />
          <Text variant="p0" color="primary200">
            商圈
          </Text>
        </Flex> */}
        <WhiteSpace />
        {/* <Divider text="我是分割线" /> */}
        {/* <WhiteSpace />
        <Divider text="我是分割线" type="dashed" />
        <WhiteSpace />
        <Divider text="我是分割线" textAlign="left" />
        <WhiteSpace />
        <Divider text="我是分割线" textAlign="left" type="dashed" />
        <WhiteSpace />
        <Divider text="我是分割线" textAlign="right" />
        <WhiteSpace />
        <Divider text="我是分割线" textAlign="right" type="dashed" /> */}
      </ScrollView>
    </Container>
  );
};
