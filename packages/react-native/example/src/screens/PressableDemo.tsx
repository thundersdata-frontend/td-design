import React from 'react';
import { Box, Center, Pressable } from '@td-design/react-native';
import Container from '../components/Container';

export default function PressableDemo() {
  const handlePress = () => {
    console.log('pressed');
  };

  const handleLongPress = () => {
    console.log('long pressed');
  };

  return (
    <Container>
      <Center>
        {/* <Box width={92} height={92}> */}
        <Pressable onPress={handlePress} onLongPress={handleLongPress} scalable={false}>
          <Box width={90} height={90} backgroundColor="gray300" />
        </Pressable>
        {/* </Box> */}
      </Center>
    </Container>
  );
}
