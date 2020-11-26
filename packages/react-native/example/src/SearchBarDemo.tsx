import React from 'react';
import { Box, Flex, SearchBar, WhiteSpace, Text, helpers, Icon } from '@td-design/react-native';

const { px } = helpers;

export default function SearchBarDemo() {
  return (
    <Box>
      <SearchBar inputContainerStyle={{ flex: 6 }} containerStyle={{ height: px(40) }}>
        <>
          <Flex flex={1}>
            <Icon name="left" />
          </Flex>
          <Flex flex={2} height={px(40)} justifyContent="center">
            <Text>请入住</Text>
          </Flex>
        </>
      </SearchBar>
      <WhiteSpace />
      <SearchBar />
      <WhiteSpace />
      <SearchBar placeholderPosition="center" />
      <WhiteSpace />
      <SearchBar autoFocus />
      <WhiteSpace />
      <SearchBar placeholder="请输入酒店/关键词" allowClear={false} showCancelButton={false} />
      <WhiteSpace />
      <SearchBar defaultValue="美团酒店" showCancelButton={false} />
      <WhiteSpace />
      <SearchBar cancelTitle="cancel" />
      <WhiteSpace />
    </Box>
  );
}
