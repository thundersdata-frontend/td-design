import React from 'react';
import { Flex, Box } from '@td-design/react-native';
import Container from '../components/Container';

export default function FlexDemo() {
  return (
    <Container>
      <Flex>
        <Box width={80} height={90} backgroundColor="black" />
        <Box width={80} height={90} backgroundColor="black" marginLeft="x1" />
      </Flex>
      <Flex style={{ borderWidth: 1, borderColor: 'red' }}>
        <Flex.Item>
          <Box height={90} backgroundColor="func500" />
        </Flex.Item>
        <Flex.Item>
          <Box height={90} backgroundColor="func500" />
        </Flex.Item>
      </Flex>
    </Container>
  );
}
