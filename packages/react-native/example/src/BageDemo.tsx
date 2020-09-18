import React from 'react';
import { Badge, Box, Text, WhiteSpace } from '@td-design/react-native';

export default () => {
  return (
    <>
      <WhiteSpace />
      <Badge dot>
        <Box width={50} height={52} backgroundColor="warningColor2" />
      </Badge>
      <WhiteSpace />
      <Badge text={'折'} backgroundColor="primaryTextColor">
        <Box backgroundColor="warningColor2" width={52} height={52} />
      </Badge>
      <WhiteSpace />
      <Badge text={10900} overflowCount={14000}>
        <Box backgroundColor="warningColor2" width={302} height={132} />
      </Badge>
      <WhiteSpace />
      <Badge text={9}>
        <Box backgroundColor="warningColor2" width={202} height={24} />
      </Badge>
      <WhiteSpace />
      <Badge text="折扣券" ribbon>
        <Box backgroundColor="warningColor2" width={82} height={82} />
      </Badge>
      <WhiteSpace />
      <Badge text={9}>
        <Text>aaaa</Text>
      </Badge>
      <WhiteSpace />
      <Badge text={10}>
        <Text>首页</Text>
      </Badge>
    </>
  );
};
