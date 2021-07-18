import React from 'react';
import { Icon, ListItem, helpers, Input, Checkable, Text } from '@td-design/react-native';
import { Image, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import Container from '../components/Container';

const { px } = helpers;

export default function ListItemDemo() {
  const imgUrl =
    'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100';
  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{}}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <ListItem title="主标题主标" extra={<Input placeholder="请输入" style={{ height: px(32) }} />} />
          <ListItem title="主标题主标题主标题主标题主标题主标题" brief="主标题下面的副标题主标题下面的副标题" />
          <ListItem title="主标题" brief="主标题下面的副标题" thumb={imgUrl} />
          <ListItem
            title="extra为Image"
            thumb={imgUrl}
            extra={
              <Image
                source={{
                  uri: imgUrl,
                }}
              />
            }
          />
          <Checkable
            type="radio"
            options={[
              {
                value: 1,
                label: <Text>我已阅读并同意</Text>,
              },
            ]}
          />
          <ListItem title="主标题" brief="主标题下面的副标题" extra={<Icon name="user" />} />
          <ListItem title="主标题22" />
          <ListItem title="主标题" brief="主标题下面的副标题" arrow="horizontal" />
          <ListItem title="主标题" brief="主标题下面的副标题" arrow="up" />

          <ListItem
            title="主标题"
            brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
            arrow="horizontal"
            align="flex-start"
            wrap
          />
          <ListItem
            title="主标题"
            brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
            arrow="horizontal"
            wrap
          />
          <ListItem title="主标题" brief="主标题下面的副标题主标题下面的副标题" arrow="horizontal" align="flex-end" />
          <ListItem title="长内容" wrap extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" required />
          <ListItem title="长内容" extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
