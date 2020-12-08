import React, { useState } from 'react';
import { Input, Icon, Box, WhiteSpace, Text, helpers } from '@td-design/react-native';
import { ScrollView, TextInput } from 'react-native';
import Container from '../components/Container';

const { px } = helpers;
const { InputItem, TextArea } = Input;
export default function InputDemo() {
  const [value, setValue] = useState<string>();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Box borderWidth={1} borderColor="borderColor">
          <Text>RN默认文本框</Text>
          <TextInput
            placeholder="input name"
            style={{
              fontSize: px(24),
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
        <InputItem label="密码" placeholder="input password" allowClear={false} inputType="password" />
        <WhiteSpace />
        <InputItem label="密码" placeholder="input password" allowClear={false} inputType="password" required colon />
      </ScrollView>
    </Container>
  );
}
