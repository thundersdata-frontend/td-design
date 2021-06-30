import React from 'react';
import { Icon, ListItem, helpers, Theme, Text, Flex, Input } from '@td-design/react-native';
import { Image, ScrollView } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Container from '../components/Container';

const { px } = helpers;
const { InputItem } = Input;

export default function ListItemDemo() {
  const theme = useTheme<Theme>();
  const imgUrl =
    'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100';
  return (
    <Container>
      <ScrollView contentContainerStyle={{}}>
        <ListItem
          style={{ backgroundColor: theme.colors.white, height: px(90), paddingTop: px(17) }}
          title={
            <Text variant="p0" color="gray500">
              提现金额
            </Text>
          }
          brief={
            <Flex paddingTop="x2">
              <Text variant="h1" color="gray500">
                ¥
              </Text>
              <InputItem
                autoFocus
                border={false}
                style={{ textAlign: 'right', fontSize: px(38), fontWeight: '700', width: '100%' }}
              />
            </Flex>
          }
          align="flex-end"
        />
        <ListItem
          title="主标题主标题主标题主标题主标题主标题"
          onPress={() => {
            console.log(111);
          }}
        />
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
    </Container>
  );
}
