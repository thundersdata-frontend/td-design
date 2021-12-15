import React from 'react';
import { Box, Center } from '@td-design/react-native';
import Container from '../components/Container';

export default function CenterDemo() {
  return (
    <Container>
      <Center>
        <Box width={90} height={90} backgroundColor="func500" />
      </Center>
      <Box width={'100%'} borderWidth={1} borderColor={'border'} height={400}>
        <Center>
          <Box width={100} height={100} backgroundColor="func200" />
        </Center>
      </Box>
    </Container>
  );
}
