/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 仇艳
 * @Date: 2020-12-30 16:11:15
 * @LastEditors: 仇艳
 * @LastEditTime: 2021-05-19 16:42:23
 */
import React from 'react';
import { Tooltip, Text, Flex, Tag, Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { px } from '../../helper';

export default () => {
  return (
    <Container>
      <ScrollView>
        <View style={{ paddingTop: 50 }}>
          <Flex justifyContent="space-between">
            <Tooltip title="InfoInfoInfoInfoInfo" width={200} style={{ borderRadius: 0 }}>
              <Text>press me</Text>
            </Tooltip>
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
              onVisibleChange={visible => {
                console.log(visible)
              }}
              withOverlay={false}
              skipAndroidStatusBar={true}
              backgroundColor="pink"
            >
              <Icon name="user" />
            </Tooltip>
            <Tooltip title={<Text variant="primaryBodyReverse">InfoInfoInfoInfoInfo Info</Text>} width={200}>
              <Text>1111111</Text>
            </Tooltip>
          </Flex>
        </View>
        <View style={{ paddingTop: 350 }}>
          <Flex justifyContent="space-around">
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
            >
              <Text>press me</Text>
            </Tooltip>

            <Tag color="red" checked>
              red
            </Tag>
            <Tooltip title={<Text variant="primaryBodyReverse">InfoInfoInfoInfoInfo Info</Text>} width={200}>
              <Text>111</Text>
            </Tooltip>
          </Flex>
        </View>

        <View style={{ paddingTop: 250 }}>
          <Flex justifyContent="space-around">
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
            >
              <Text>press me</Text>
            </Tooltip>

            <Tag color="red" checked>
              red
            </Tag>
            <Tooltip title={<Text variant="primaryBodyReverse">InfoInfoInfoInfoInfo Info</Text>} width={200}>
              <Text>111</Text>
            </Tooltip>
          </Flex>
        </View>
      </ScrollView>
    </Container >
  );
};
