import React from 'react';
import { Flex, Box, Divider, Text, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Box backgroundColor="success">
          <Text>二胡反华反坏发货护额回复i回复i恢复恢复恢复恢复i哈弗i啊忽忽复活节卡恢复健康回房间哈方吉奥环境</Text>
        </Box>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Flex backgroundColor="dangerousColor" height={40}>
          <Text>酒店</Text>
          <Divider type="vertical" verticalHeight={30} />
          <Text>商圈</Text>
        </Flex>
      </ScrollView>
    </Container>
  );
};
