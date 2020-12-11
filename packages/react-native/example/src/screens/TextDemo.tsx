import React from 'react';
import { Text } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <Text variant="primaryBody">你好，我是文字</Text>
      {/* <Text fontSize={30} color="primaryColor" fontWeight="800">
        你好，我是文字
      </Text> */}
    </Container>
  );
};
