import React from 'react';
import { Flex, SearchBar, WhiteSpace, Text, helpers, Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

const { px } = helpers;

export default function SearchBarDemo() {
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        {/* 默认配置 */}
        <SearchBar onChange={value => console.log(value)} onSearch={value => console.log(value)} />
        <WhiteSpace />

        {/* 配置placeholder、cancelTitle */}
        <SearchBar placeholder="请输入酒店/关键词" cancelTitle="cancel" />
        <WhiteSpace />

        {/* 配置placeholderPosition */}
        <SearchBar placeholderPosition="center" />
        <WhiteSpace />

        {/* 配置defaultValue、autoFocus */}
        <SearchBar defaultValue="美团酒店" autoFocus />
        <WhiteSpace />

        {/* 配置children */}
        <SearchBar>
          <Text variant="support2">入住时间</Text>
          <Text variant="support2">离店时间</Text>
        </SearchBar>
        <WhiteSpace />
      </View>
    </Container>
  );
}
