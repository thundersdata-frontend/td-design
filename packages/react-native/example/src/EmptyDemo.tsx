import React from 'react';
import { Box, Empty, Flex, Text } from '@td-design/react-native';
import { Image } from 'react-native';

export default function EmptyDemo() {
  return (
    <>
      {/* 基本 */}
      <Empty isEmpty={true} />
      {/* 自定义图片 */}
      <Empty isEmpty={true} img={<Image source={require('../assets/img/pic_empty.png')}></Image>} />
      {/* 有数据时 */}
      <Empty isEmpty={false} backgroundColor="backgroundColor1" height={200}>
        <Text>11</Text>
      </Empty>
      {/* 是否填充对比 */}
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
