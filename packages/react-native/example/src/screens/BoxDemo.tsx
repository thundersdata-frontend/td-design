import React from 'react';
import { Box, Text } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <Box
        width={200}
        height={200}
        borderWidth={1}
        borderColor="borderColor"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Hello, Box</Text>
      </Box>
    </Container>
  );
};
