import React from 'react';
import { Flex, Tag, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <WingBlank>
        <WhiteSpace />
        <Text>默认情况</Text>
        <Flex justifyContent="space-between">
          <Tag text="大标签" size="large" />
          <Tag text="中标签" size="middle" />
          <Tag text="小标签小标签" size="small" />
        </Flex>
        <WhiteSpace />
        <Text>自定义背景色</Text>
        <Flex justifyContent="space-between">
          <Tag backgroundColor="func200" text="标签" />
          <Tag backgroundColor="func300" text="标签" />
          <Tag backgroundColor="func500" text="小标签标签" />
        </Flex>
        <WhiteSpace />
        <Text>自定义文字颜色</Text>
        <Flex justifyContent="space-between">
          <Tag color="func200" text="标签" />
          <Tag color="func300" text="标签" />
          <Tag color="func500" text="标签" />
        </Flex>
        <WhiteSpace />
        <Text>镂空标签</Text>
        <Flex justifyContent="space-between">
          <Tag backgroundColor="func200" ghost text="标签" />
          <Tag backgroundColor="func300" ghost text="标签" />
          <Tag backgroundColor="func500" ghost text="标签" />
        </Flex>
        <WhiteSpace />
        <Text>禁用情况</Text>
        <Flex justifyContent="space-between">
          <Tag disabled text="标签" />
          <Tag backgroundColor="func300" disabled text="标签" />
          <Tag backgroundColor="func500" disabled text="标签" />
        </Flex>
        <WhiteSpace />
        <Text>选中情况</Text>
        <Flex justifyContent="space-between">
          <Tag selected text="标签" />
          <Tag backgroundColor="func300" selected text="标签" />
          <Tag backgroundColor="func500" selected text="标签" />
        </Flex>
        <WhiteSpace />
        <Text>可删除情况</Text>
        <Flex justifyContent="space-between">
          <Tag closable text="标签" />
          <Tag backgroundColor="func300" closable text="标签" />
          <Tag backgroundColor="func500" closable text="标签" />
        </Flex>
      </WingBlank>
    </Container>
  );
};
