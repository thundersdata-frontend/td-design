import React from 'react';
import { Box, Empty, Flex, Text } from '@td-design/react-native';
import { Image } from 'react-native';
import Container from '../components/Container';

export default function EmptyDemo() {
  return (
    <Container>
      {/* 基本 */}
      <Empty isEmpty={true} />
      {/* 自定义图片 */}
      <Empty isEmpty={true} img={<Image source={require('../../assets/img/pic_empty.png')}></Image>} />
      {/* 有数据时 */}
      <Empty isEmpty={false} backgroundColor="backgroundColor1" height={200}>
        <Text>11</Text>
      </Empty>
      {/* 是否填充对比 */}
      <Flex>
        <Box width={200} height={200} backgroundColor="warningColor1">
          <Empty
            isEmpty={true}
            backgroundColor="backgroundColor1"
            imgStyle={{ width: 100, height: 100 }}
            fontSize={16}
          />
        </Box>
        <Box width={200} height={200} backgroundColor="warningColor1">
          <Empty flex={0} isEmpty={true} backgroundColor="backgroundColor1" imgStyle={{ width: 100, height: 100 }} />
        </Box>
      </Flex>
    </Container>
  );
}
