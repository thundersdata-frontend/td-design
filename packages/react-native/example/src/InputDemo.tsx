import React, { useState } from 'react';
import { Input, Icon, Box, WingBlank, WhiteSpace, Text } from '@td-design/react-native';
import { TextInput } from 'react-native';

const { InputItem, TextArea } = Input;
export default function InputDemo() {
  const [value, setValue] = useState<string>();

  return (
    <>
      <WingBlank>
        <WhiteSpace />
        <Box borderWidth={1} borderColor="borderColor">
          <TextInput
            placeholder="input name"
            style={{
              fontSize: 24,
            }}
          />
        </Box>
        <WhiteSpace />
        <Box>
          <Input placeholder="input name" label="name" leftIcon={<Icon name="user" color="green" />} />
          <WhiteSpace />
          <Input
            value={value}
            onChange={setValue}
            label="name"
            placeholder="input name"
            leftIcon={<Icon name="user" color="green" />}
            rightIcon={<Icon name="user" color="green" />}
          />
          <WhiteSpace />
          <Input
            label="name"
            placeholder="input name"
            labelPosition="top"
            leftIcon={<Icon name="user" color="green" />}
          />
          <WhiteSpace />
          <Input
            label="name"
            placeholder="input name"
            labelPosition="top"
            leftIcon={<Icon name="user" color="green" />}
            inputType="password"
          />
        </Box>
        <WhiteSpace />
        <TextArea label="姓名" placeholder="input name" />
      </WingBlank>
      <WhiteSpace />
      <InputItem label="姓名" placeholder="input name" allowClear />
      <WhiteSpace />
      <InputItem label="姓名" placeholder="input name" allowClear extra="test" />
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
      <InputItem label="姓名" placeholder="input name" allowClear={false} inputType="password" />
      <WhiteSpace />
      <InputItem label="姓名" placeholder="input name" allowClear={false} inputType="password" required colon />
    </>
  );
}
