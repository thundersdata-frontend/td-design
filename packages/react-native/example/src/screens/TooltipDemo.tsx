import React from 'react';
import { Tooltip, Text, Box, Icon, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

export default () => {
  return (
    <Container >
      <View style={{ padding: 150 }}>
        <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='top' maskClosable indicatorPosition='start'>
          <Box style={{ backgroundColor: 'red' }} width={100} height={132} ><Text variant="primaryBody">你好，我是文字</Text></Box>
        </Tooltip>

        <WhiteSpace />
        <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='top' maskClosable indicatorPosition='center'>
          <Box style={{ backgroundColor: 'red' }} width={100} height={132} ><Text variant="primaryBody">你好，我是文字</Text></Box>
        </Tooltip>
        <WhiteSpace />
        <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='top' maskClosable indicatorPosition='end'>
          <Box style={{ backgroundColor: 'red' }} width={100} height={132} ><Text variant="primaryBody">你好，我是文字</Text></Box>
        </Tooltip>
        <WhiteSpace />
      </View>
    </Container>
  );
};
