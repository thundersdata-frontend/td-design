import React from 'react';
import { List, helpers, Input, Box, Text } from '@td-design/react-native';
import { ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import Container from '../components/Container';

const { px } = helpers;

export default function ListDemo() {
  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{}}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <List
            header="基础使用"
            items={[
              { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
              {
                title: '主标题主标题主标题主标题主标题主标题',
                brief: '主标题下面的副标题主标题下面的副标题',
                arrow: 'horizontal',
                onPress: () => console.log('onPress'),
              },
            ]}
          />
          <List
            header="设置背景色"
            itemBackgroundColor="primary200"
            items={[
              { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
              {
                title: '主标题主标题主标题主标题主标题主标题',
                brief: '主标题下面的副标题主标题下面的副标题',
                arrow: 'horizontal',
                onPress: () => console.log('onPress'),
              },
            ]}
          />
          <List
            header="覆盖背景色"
            itemBackgroundColor="primary200"
            items={[
              { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
              {
                title: '主标题主标题主标题主标题主标题主标题',
                brief: '主标题下面的副标题主标题下面的副标题',
                backgroundColor: 'func200',
                arrow: 'horizontal',
                onPress: () => console.log('onPress'),
              },
            ]}
          />
          <List
            header={<CustomHeader />}
            items={[
              { title: '主标题主标', extra: <Input placeholder="请输入" style={{ height: px(32) }} /> },
              {
                title: '主标题主标题主标题主标题主标题主标题',
                brief: '主标题下面的副标题主标题下面的副标题',
                arrow: 'horizontal',
                onPress: () => console.log('onPress'),
              },
            ]}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

function CustomHeader() {
  return (
    <Box height={px(36)} justifyContent="center" paddingLeft="x4" backgroundColor="func300">
      <Text variant="p2" color="func500">
        自定义header
      </Text>
    </Box>
  );
}
