import React, { useRef, useState } from 'react';
import { AutoComplete, helpers } from '@td-design/react-native';
import { useRequest } from 'ahooks';
import { View, Text } from 'react-native';

const { ONE_PIXEL } = helpers;
export default () => {
  const fetchData: () => Promise<{ key: number; title: string }[]> = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = [
          { key: 1, title: '张三' },
          { key: 2, title: '李四' },
          { key: 3, title: '王五' },
          { key: 4, title: '赵六' },
          { key: 5, title: '赵七' },
        ];
        resolve(data);
      }, 500);
    });
  };

  const [value, setValue] = useState<string>();
  const [data, setData] = useState<{ key: number; title: string }[]>([]);
  const originData = useRef<{ key: number; title: string }[]>([]);

  useRequest(fetchData, {
    onSuccess: data => {
      originData.current = data;
      setData(data);
    },
  });

  const filter = (value = '') => {
    const newData = value === '' ? originData.current : data.filter(item => item.title.includes(value));
    setData(newData);
  };

  console.log({ data });
  return (
    <View style={{ flex: 1 }}>
      <Text>输入的值：{value}</Text>
      <AutoComplete
        value={value}
        onChange={value => {
          setValue(value);
          filter(value);
        }}
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
    </View>
  );
};
