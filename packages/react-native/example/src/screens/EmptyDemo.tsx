import React from 'react';
import { Box, Empty } from '@td-design/react-native';
import Container from '../components/Container';
import { Image } from 'react-native';

export default function EmptyDemo() {
  return (
    <Container>
      <Box flex={1}>
        <Empty customImg={<Image source={require('../../assets/img/pic_empty.png')} />} />
      </Box>
    </Container>
  );
}
