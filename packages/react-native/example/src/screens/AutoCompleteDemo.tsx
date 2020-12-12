import React, { useState } from 'react';
import { AutoComplete, helpers } from '@td-design/react-native';
import { useRequest } from 'ahooks';
import { Text, ScrollView } from 'react-native';
import Container from '../components/Container';

const { ONE_PIXEL } = helpers;
const fetchData: () => Promise<{ key: number; title: string }[]> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = [
        { key: 1, title: '张三' },
        { key: 6, title: '张四' },
        { key: 2, title: '李四' },
        { key: 3, title: '王五' },
        { key: 4, title: '赵六' },
        { key: 5, title: '赵七' },
      ];
      resolve(data);
    }, 1500);
  });
};
export default () => {
  const [value, setValue] = useState<string>();
  const { data } = useRequest(fetchData);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Text>输入的值：{value}</Text>
        <AutoComplete
          value={value}
          onChange={setValue}
          dropdownContainerStyle={{ borderTopWidth: ONE_PIXEL, borderTopColor: '#eee' }}
          options={data}
          onSelect={setValue}
        />
        {/* <Text>
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
        我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容我是其他内容
      </Text> */}
      </ScrollView>
    </Container>
  );
};
