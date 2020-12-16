import React from 'react';
import { Icon, ListItem } from '@td-design/react-native';
import { Image, Switch, ScrollView } from 'react-native';
import Container from '../components/Container';

export default function ListItemDemo() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ListItem
          title="主标题主标题主标题主标题主标题主标题"
          onPress={() => {
            console.log(111);
          }}
        />
        <ListItem title="主标题主标题主标题主标题主标题主标题" brief="主标题下面的副标题主标题下面的副标题" />

        <ListItem
          title="主标题"
          brief="主标题下面的副标题"
          thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606285430559&di=c907f729d36be1a5d18b0a05fd2ac86a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F13%2F20190213001818_qzcmb.thumb.400_0.png"
        />
        <ListItem
          title="extra为Image"
          thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606285430559&di=c907f729d36be1a5d18b0a05fd2ac86a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F13%2F20190213001818_qzcmb.thumb.400_0.png"
          extra={
            <Image
              source={{
                uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606285430559&di=c907f729d36be1a5d18b0a05fd2ac86a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F13%2F20190213001818_qzcmb.thumb.400_0.png',
              }}
              style={{ width: 40, height: 40 }}
            />
          }
        />
        <ListItem title="主标题" brief="主标题下面的副标题" extra={<Icon name="user" />} />
        <ListItem title="主标题" brief="主标题下面的副标题" extra={<Switch />} />
        <ListItem title="主标题" brief="主标题下面的副标题" arrow="down" />
        <ListItem title="主标题" brief="主标题下面的副标题" arrow="horizontal" />
        <ListItem title="主标题" brief="主标题下面的副标题" arrow="up" />

        <ListItem
          title="主标题"
          brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
          arrow="horizontal"
          extra="请选择"
          align="flex-start"
          wrap
        />
        <ListItem
          title="主标题"
          brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
          arrow="horizontal"
          wrap
          extra="请选择"
        />
        <ListItem
          title="主标题"
          brief="主标题下面的副标题主标题下面的副标题"
          arrow="horizontal"
          extra="请选择"
          align="flex-end"
        />
        <ListItem title="长内容" wrap extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" required />
        <ListItem title="长内容" extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal" />
      </ScrollView>
    </Container>
  );
}
