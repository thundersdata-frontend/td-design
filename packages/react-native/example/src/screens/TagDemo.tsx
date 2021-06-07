import React from 'react';
import { Flex, Tag, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

export default () => {
  return (
    <Container>
      <WingBlank>
        <WhiteSpace />
        <Text>默认情况</Text>
        <Flex justifyContent="space-between">
          <Tag size="large">大标签</Tag>
          <Tag>中标签</Tag>
          <Tag size="small">小标签</Tag>
        </Flex>
        <WhiteSpace />
        <Text>自定义背景色和文字颜色</Text>
        <Flex justifyContent="space-between">
          <Tag size="large" backgroundColor="blue" color="red" closable>
            大标签
          </Tag>
          <Tag backgroundColor="blue" color="red">
            中标签
          </Tag>
          <Tag size="small" backgroundColor="blue" color="red">
            小标签
          </Tag>
        </Flex>
        <WhiteSpace />
        <Text>禁用情况</Text>
        <Flex justifyContent="space-between">
          <Tag size="large" disabled>
            大标签
          </Tag>
          <Tag disabled>中标签</Tag>
          <Tag size="small" disabled>
            小标签
          </Tag>
        </Flex>
        <WhiteSpace />
        <Text>选中情况</Text>
        <Flex justifyContent="space-between">
          <Tag size="large" selected>
            大标签
          </Tag>
          <Tag selected>中标签</Tag>
          <Tag size="small" selected>
            小标签
          </Tag>
        </Flex>
        <WhiteSpace />
        <Text>可删除情况</Text>
        <Flex justifyContent="space-between">
          <Tag size="large" closable>
            大标签
          </Tag>
          <Tag closable>中标签</Tag>
          <Tag size="small" closable>
            小标签
          </Tag>
        </Flex>
      </WingBlank>
    </Container>
  );
};
