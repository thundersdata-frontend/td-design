import React, { useState } from 'react';
import { Input, Box, WhiteSpace, Text } from '@td-design/react-native';
import { ScrollView } from 'react-native';
import Container from '../components/Container';

const { InputItem, TextArea } = Input;
export default function InputDemo() {
  const [value, setValue] = useState<string>();

  return (
    <Container>
      <Box>
        <Input placeholder="请输入姓名" />
        <WhiteSpace />
        <Input colon required value={value} onChange={setValue} label="姓名" placeholder="请输入姓名" />
        <WhiteSpace />
        <Input label="姓名" placeholder="请输入姓名" labelPosition="top" />
        <WhiteSpace />
        <Input label="姓名" placeholder="input name" labelPosition="top" inputType="password" />
      </Box>
      <WhiteSpace />
      <TextArea label="详情" placeholder="请输入详情" limit={20} />
      <WhiteSpace />
      <InputItem label="姓名" placeholder="请输入姓名" />
      <WhiteSpace />
      <InputItem label="姓名" placeholder="请输入姓名" extra={<Text style={{ color: 'green' }}>test</Text>} />
      <WhiteSpace />
      <InputItem
        label="姓名"
        placeholder="input name"
        allowClear
        extra={
          <Text variant="p0" color="primary200">
            说明文字
          </Text>
        }
      />
      <WhiteSpace />
      <InputItem label="姓名" placeholder="input name" allowClear />
      <WhiteSpace />
      <InputItem label="密码" placeholder="input password" inputType="password" />
      <WhiteSpace />
      <InputItem label="密码" placeholder="请输入密码" inputType="password" required colon />
    </Container>
  );
}
