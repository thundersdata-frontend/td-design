import React from 'react';
import { ListItem, WhiteSpace } from '@td-design/react-native';
import { Image } from 'react-native';

export default function ListItemDemo() {
  return (
    <>
      <WhiteSpace />
      <ListItem
        title="主标题"
        brief="主标题下面的副标题"
        thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
        onPress={() => {
          console.log(111);
        }}
      />
      <ListItem title="主标题" arrow />
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
      <ListItem
        title="长内容"
        multipleLine
        wrap
        extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
        isError
      />
    </>
  );
}
