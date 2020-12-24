import React from 'react';
import { Flex, SearchBar, WhiteSpace, Text, helpers, Icon } from '@td-design/react-native';
import Container from '../components/Container';

const { px } = helpers;

export default function SearchBarDemo() {
  return (
    <Container>
      {/* 默认配置 */}
      <SearchBar onChange={value => console.log(value)} onSearch={value => console.log(value)} />
      <WhiteSpace />

      {/* 配置placeholder、cancelTitle */}
      {/* <SearchBar placeholder="请输入酒店/关键词" cancelTitle="cancel" />
      <WhiteSpace /> */}

      {/* 配置placeholderPosition */}
      {/* <SearchBar placeholderPosition="center" />
      <WhiteSpace /> */}

      {/* 配置defaultValue、autoFocus */}
      {/* <SearchBar defaultValue="美团酒店" autoFocus />
      <WhiteSpace /> */}

      {/* 配置children */}
      {/* <SearchBar inputContainerStyle={{ flex: 6 }} containerStyle={{ height: px(40) }}>
        <>
          <Flex flex={1}>
            <Icon name="left" />
          </Flex>
          <Flex flex={2} height={px(40)} justifyContent="center">
            <Text>请入住</Text>
          </Flex>
        </>
      </SearchBar>
      <WhiteSpace /> */}
    </Container>
  );
}
