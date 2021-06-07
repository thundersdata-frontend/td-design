import React from 'react';
import { Badge, Box, WhiteSpace, helpers, Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

const { px } = helpers;
export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* type默认，展示为text */}
        <Badge text={4}>
          <Box width={50} height={52} backgroundColor="func500" />
        </Badge>
        <WhiteSpace />
        <Badge text="折" backgroundColor="primary100">
          <Box backgroundColor="func500" width={52} height={52} />
        </Badge>

        {/* type为ribbon */}
        <WhiteSpace />
        <Badge text="折扣券" type="ribbon">
          <Box backgroundColor="func500" width={px(44)} height={px(44)} />
        </Badge>
        <WhiteSpace />
        <Badge text={9} type="ribbon">
          <Box backgroundColor="func500" width={202} height={240} />
        </Badge>

        {/* type为dot */}
        <WhiteSpace />
        <Badge text={4} type="dot">
          <Box width={50} height={52} backgroundColor="func500" />
        </Badge>

        {/* overflowCount */}
        <WhiteSpace />
        <Badge text={10900} overflowCount={14000} backgroundColor="func300">
          <Box backgroundColor="func500" width={302} height={132} />
        </Badge>
        <WhiteSpace />
        <Badge text={10900} backgroundColor="func300">
          <Box backgroundColor="func500" width={302} height={132} />
        </Badge>
        <WhiteSpace />
        <Badge text="12">
          <Icon name="user" size={32} />
        </Badge>
      </ScrollView>
    </Container>
  );
};
