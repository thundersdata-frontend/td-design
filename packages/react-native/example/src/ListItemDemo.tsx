import React from 'react';
import { Icon, ListItem, WhiteSpace } from '@td-design/react-native';
import { Image, Switch } from 'react-native';

export default function ListItemDemo() {
  return (
    <>
      <WhiteSpace />
      <ListItem title="主标题主标题主标题主标题主标题主标题" />
      <ListItem title="主标题主标题主标题主标题主标题主标题" brief="主标题下面的副标题主标题下面的副标题" />
      <ListItem
        title="主标题"
        brief="主标题下面的副标题"
        thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
        onPress={() => {
          console.log(111);
        }}
      />
      <ListItem title="主标题" brief="主标题下面的副标题" extra={<Icon name="user" />} />
      <ListItem title="主标题" brief="主标题下面的副标题" extra={<Switch />} />
      <ListItem title="主标题" brief="主标题下面的副标题" arrow="down" />
      <ListItem title="主标题" brief="主标题下面的副标题" arrow="up" />
      <ListItem
        title="主标题"
        brief="主标题下面的副标题主标题下面的副标题"
        arrow="horizontal"
        extra="请选择"
        align="top"
      />
      <ListItem title="主标题" brief="主标题下面的副标题主标题下面的副标题" arrow="horizontal" extra="请选择" />
      <ListItem
        title="主标题"
        brief="主标题下面的副标题主标题下面的副标题"
        arrow="horizontal"
        extra="请选择"
        align="bottom"
      />
      <ListItem
        title="extra为Image"
        thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
        extra={
          <Image
            source={{
              uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
            }}
            style={{ width: 40, height: 40 }}
          />
        }
      />
      <ListItem
        title="extra为Image"
        extra={
          <Image
            source={{
              uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png',
            }}
            style={{ width: 29, height: 29 }}
          />
        }
      />
      <ListItem title="长内容" wrap extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" required />
      <ListItem title="长内容" extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal" />
    </>
  );
}
