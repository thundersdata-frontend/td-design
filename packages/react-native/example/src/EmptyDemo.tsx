import React from 'react';
import { Box, Empty, Flex } from '@td-design/react-native';

export default function EmptyDemo() {
  return (
    <>
      <Empty isEmpty={true} />
      <Empty isEmpty={true} backgroundColor="backgroundColor1" height={200} />
      <Flex>
        <Box width={200} height={200} backgroundColor="warningColor1">
          <Empty
            isFill={false}
            isEmpty={true}
            backgroundColor="backgroundColor1"
            imgStyle={{ width: 100, height: 100 }}
          />
        </Box>
        <Box width={200} height={200} backgroundColor="warningColor1">
          <Empty isFill isEmpty={true} backgroundColor="backgroundColor1" imgStyle={{ width: 100, height: 100 }} />
        </Box>
      </Flex>
    </>
  );
}
