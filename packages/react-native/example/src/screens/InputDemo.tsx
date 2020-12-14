import React, { useState } from 'react';
import { Input, Icon, Box, WhiteSpace, Text } from '@td-design/react-native';
import { ScrollView } from 'react-native';
import Container from '../components/Container';

const { InputItem, TextArea } = Input;
export default function InputDemo() {
  const [value, setValue] = useState<string>();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Box>
          <Input placeholder="请输入姓名" />
          <WhiteSpace />
          <Input
            colon
            required
            value={value}
            onChange={setValue}
            label="姓名"
            placeholder="请输入姓名"
            leftIcon={<Icon name="user" color="green" />}
            rightIcon={<Icon name="customerservice" color="gold" />}
          />
          <WhiteSpace />
          <Input
            label="姓名"
            placeholder="请输入姓名"
            labelPosition="top"
            leftIcon={<Icon name="user" color="green" />}
          />
          <WhiteSpace />
          <Input
            label="姓名"
            placeholder="input name"
            labelPosition="top"
            leftIcon={<Icon name="user" color="green" />}
            inputType="password"
          />
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
          extra={<Text variant="primaryTipReverse">说明文字</Text>}
        />
        <WhiteSpace />
        <InputItem label="姓名" placeholder="input name" allowClear extra={<Icon name="user" color="green" />} />
        <WhiteSpace />
        <InputItem label="密码" placeholder="input password" allowClear={false} inputType="password" />
        <WhiteSpace />
        <InputItem label="密码" placeholder="请输入密码" allowClear={false} inputType="password" required colon />
      </ScrollView>
    </Container>
  );
}
