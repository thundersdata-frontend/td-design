import React from 'react';
import { Badge, Box, Text, WhiteSpace, helpers } from '@td-design/react-native';

const { px } = helpers;
export default () => {
  return (
    <>
      <WhiteSpace />
      <Badge type="text" text={4}>
        <Box width={50} height={52} backgroundColor="warningColor2" />
      </Badge>
      <WhiteSpace />
      <Badge text={'折'} backgroundColor="primaryTextColor">
        <Box backgroundColor="warningColor2" width={52} height={52} />
      </Badge>
      <WhiteSpace />
      <Badge text={'折扣券'} backgroundColor="primaryTextColor" type="ribbon">
        <Box backgroundColor="warningColor2" width={px(44)} height={px(44)} />
      </Badge>
      <WhiteSpace />
      <Badge text={10900} overflowCount={14000} backgroundColor="success">
        <Box backgroundColor="warningColor2" width={302} height={132} />
      </Badge>
      <WhiteSpace />
      <Badge text={9} type="ribbon">
        <Box backgroundColor="warningColor2" width={202} height={240} />
      </Badge>
      <WhiteSpace />
      <Badge text="折扣券" type="ribbon">
        <Box backgroundColor="warningColor2" width={px(62)} height={px(62)} />
      </Badge>
      <WhiteSpace />
      <Badge text={9}>
        <Text>aaaa</Text>
      </Badge>
      <WhiteSpace />
      <Badge text={10} type="ribbon">
        <Text>首页</Text>
      </Badge>
    </>
  );
};
