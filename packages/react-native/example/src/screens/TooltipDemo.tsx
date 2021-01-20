/*
 * @文件描述: 
 * @公司: thundersdata
 * @作者: 仇艳
 * @Date: 2020-12-30 16:11:15
 * @LastEditors: 仇艳
 * @LastEditTime: 2021-01-20 14:59:55
 */
import React from 'react';
import { Tooltip, Text, Box, WhiteSpace, Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default () => {
  return (
    <Container >
      <ScrollView>
        <View style={{ padding: 150 }}>
          <View style={{ height: 200 }}></View>
          <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='right' indicatorPosition='start'>
            <Icon name='user' />
          </Tooltip>
          <WhiteSpace />
          <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='right' indicatorPosition='center'>
            <Icon name='user' />
          </Tooltip>
          <WhiteSpace />
          <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='right' indicatorPosition='end'>
            <Icon name='user' />
          </Tooltip>
          <WhiteSpace />
          <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='right' maskClosable indicatorPosition='start'>
            <Box style={{ backgroundColor: 'red' }} width={100} height={132} ><Text variant="primaryBody">你好，我是文字</Text></Box>
          </Tooltip>

          <WhiteSpace />
          <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='right' maskClosable indicatorPosition='center'>
            <Box style={{ backgroundColor: 'red' }} width={100} height={132} ><Text variant="primaryBody">你好，我是文字</Text></Box>
          </Tooltip>
          <WhiteSpace />
          <Tooltip title="texttesttexttesttexttesttexttesttexttesttexttesttexttesttexttest" position='right' indicatorPosition='end'>
            <Box style={{ backgroundColor: 'red' }} width={100} height={132} ><Text variant="primaryBody">你好，我是文字</Text></Box>
          </Tooltip>
          <WhiteSpace />
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </Container>
  );
};
