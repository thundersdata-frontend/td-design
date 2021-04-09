import React from 'react';
import { Box, Empty, Flex, Text, WhiteSpace } from '@td-design/react-native';
import { Image, ScrollView, View } from 'react-native';
import Container from '../components/Container';

export default function EmptyDemo() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ backgroundColor: '#000', flex: 1 }}>
        {/* 基本 */}
        {/* <Empty isEmpty /> */}
        {/* 自定义图片 */}
        <Empty isEmpty img={<Image source={require('../../assets/img/pic_empty.png')} />} />
        {/* 有数据时 */}
        {/* <Empty height={200}>
          <Text>11</Text>
        </Empty> */}
        {/* 是否填充对比 */}
        <View>
          {/* <Box width={200} height={200}>
            <Empty isEmpty imgStyle={{ width: 100, height: 100 }} />
          </Box> */}
          {/* <WhiteSpace />
          <Box width={200} height={200}>
            <Empty flex={0} isEmpty={true} imgStyle={{ width: 100, height: 100 }} />
          </Box> */}
        </View>
      </ScrollView>
    </Container>
  );
}
