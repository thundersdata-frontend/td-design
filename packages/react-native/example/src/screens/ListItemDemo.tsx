import React from 'react';
import { ListItem, Input, Text } from '@td-design/react-native';
import { Image, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import Container from '../components/Container';

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
          <ListItem
            title="主标题主标"
            extra={<Input placeholder="请输入" />}
            brief={
              <Text variant={'p3'} color="func600">
                姓名不能为空
              </Text>
            }
            style={{ borderBottomWidth: 1, borderBottomColor: 'red' }}
          />
          <ListItem
            title="主标题主标题主标题主标题主标题主标题主标题主标题主标题主标题主标题主标题"
            brief="主标题下面的副标题主标题下面的副标题主标题下面的副标题主标题下面的副标题"
            arrow="horizontal"
            onPress={() => {
              console.log('onPress');
            }}
          />
          <ListItem title="主标题" brief="主标题下面的副标题" thumb={imgUrl} />
          <ListItem
            title="extra为Image"
            thumb={imgUrl}
            extra={
              <Image
                source={{
                  uri: imgUrl,
                }}
                style={{ width: 50, height: 50 }}
              />
            }
          />
          <ListItem title="主标题333" brief="主标题下面的副标题" arrow="up" />
          <ListItem title="主标题22" arrow="horizontal" />
          <ListItem title="主标题" brief="主标题下面的副标题" arrow="horizontal" />
          <ListItem title="主标题444" brief="主标题下面的副标题" arrow="down" />

          <ListItem
            title="主标题"
            brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
            arrow="horizontal"
            wrap
          />
          <ListItem
            title="主标题"
            brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
            arrow="horizontal"
            onPress={() => {
              console.log('onPress');
            }}
          />
          <ListItem title="主标题" brief="主标题下面的副标题主标题下面的副标题" arrow="horizontal" />
          <ListItem
            title="长内容2222222"
            wrap
            extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            required
          />
          <ListItem title="长内容" extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
