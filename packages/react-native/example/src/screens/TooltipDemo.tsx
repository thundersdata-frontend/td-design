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

export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20, justifyContent: 'space-between', flex: 1 }}>
        <View>
          <Flex justifyContent="space-between">
            <Tooltip title="InfoInfoInfoInfoInfo" width={200} style={{ borderRadius: 0 }}>
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
              onVisibleChange={visible => {
                console.log(visible);
              }}
              withOverlay={false}
              skipAndroidStatusBar={true}
              backgroundColor="pink"
            >
              <Icon name="user" />
            </Tooltip>
            <Tooltip
              title={
                <Text variant="p1" color="primary200">
                  InfoInfoInfoInfoInfo Info
                </Text>
              }
              width={200}
            >
              <Text variant="p0" color="primary200">
                1111111
              </Text>
            </Tooltip>
          </Flex>
        </View>
        <View>
          <Flex justifyContent="space-around">
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
              withOverlay={false}
            >
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            <Tooltip
              title={
                <Text variant="p1" color="primary200">
                  InfoInfoInfoInfoInfo Info
                </Text>
              }
              width={200}
            >
              <Text variant="p0" color="primary200">
                111
              </Text>
            </Tooltip>
          </Flex>
        </View>

        <View>
          <Flex justifyContent="space-around">
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
            >
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            <Tooltip
              title={
                <Text variant="p1" color="primary200">
                  InfoInfoInfoInfoInfo Info
                </Text>
              }
              width={200}
            >
              <Text variant="p0" color="primary200">
                111
              </Text>
            </Tooltip>
          </Flex>
        </View>
      </ScrollView>
    </Container>
  );
};
