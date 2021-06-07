import React from 'react';
import { Box, Empty, Flex, Text, WhiteSpace } from '@td-design/react-native';
import { Image, ScrollView, View } from 'react-native';
import Container from '../components/Container';

export default function EmptyDemo() {
  return (
    <Container>
      <Box width={200} height={200}>
        <Empty isEmpty imgStyle={{ width: 100, height: 100 }} />
      </Box>
      <WhiteSpace />
      <Box width={200} height={200}>
        <Empty
          isEmpty
          imgStyle={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: 'red',
          }}
        />
      </Box>
    </Container>
  );
}
