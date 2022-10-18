import React from 'react';
import { SearchBar, WhiteSpace, Text, helpers } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

const { px } = helpers;

export default function SearchBarDemo() {
  return (
    <Container>
      <View style={{ flex: 1 }}>
        {/* 默认配置 */}
        <SearchBar
          inputStyle={{ backgroundColor: '#fff', borderRadius: px(28) }}
          onChange={value => console.log(value)}
          onSearch={value => console.log(value)}
        />
        <WhiteSpace />

        {/* 配置placeholder、cancelTitle */}
        <SearchBar placeholder="请输入酒店/关键词" cancelTitle="cancel" cancelWidth={60} />
        <WhiteSpace />

        {/* 配置placeholderPosition */}
        <SearchBar placeholderPosition="center" />
        <WhiteSpace />

        {/* 配置defaultValue、autoFocus */}
        <SearchBar defaultValue="美团酒店" autoFocus />
        <WhiteSpace />

        {/* 配置children */}
        <SearchBar>
          <Text variant="p3" color="gray300">
            入住时间
          </Text>
          <Text variant="p3" color="gray300">
            离店时间
          </Text>
        </SearchBar>
        <WhiteSpace />
      </View>
    </Container>
  );
}
