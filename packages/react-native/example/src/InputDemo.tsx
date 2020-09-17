import React, { useState } from 'react';
import { Input, Icon, Box, WingBlank, WhiteSpace, Text } from '@td-design/react-native';
import { ScrollView } from 'react-native';

const { InputItem, TextArea } = Input;
export default function InputDemo() {
  const [value, setValue] = useState<string>();

  return (
    <ScrollView>
      <WingBlank>
        <Box>
          <Input placeholder="input name" label="name" leftIcon={<Icon name="user" color="green" />} />
          <WhiteSpace />
          <Input
            value={value}
            onChange={setValue}
            label="name"
            leftIcon={<Icon name="user" color="green" />}
            rightIcon={<Icon name="user" color="green" />}
          />
          <WhiteSpace />
          <Input label="name" labelPosition="top" leftIcon={<Icon name="user" color="green" />} />
          <WhiteSpace />
          <Input label="name" labelPosition="top" leftIcon={<Icon name="user" color="green" />} inputType="password" />
        </Box>
        <WhiteSpace />
        <TextArea label="姓名" />
      </WingBlank>
      <WhiteSpace />
      <InputItem label="姓名" allowClear />
      <WhiteSpace />
      <InputItem label="姓名" allowClear extra="test" />
      <WhiteSpace />
      <InputItem label="姓名" allowClear extra={<Text variant="primaryTipReverse">说明文字</Text>} />
      <WhiteSpace />
      <InputItem label="姓名" allowClear extra={<Icon name="user" color="green" />} />
      <WhiteSpace />
      <InputItem label="姓名" allowClear={false} inputType="password" />
      <WhiteSpace />
      <InputItem label="姓名" allowClear={false} inputType="password" required colon />
    </ScrollView>
  );
}
