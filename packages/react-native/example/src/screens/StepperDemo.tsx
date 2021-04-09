import React, { useState } from 'react';
import { Box, Stepper, Text, WhiteSpace, WingBlank, helpers } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

const { px } = helpers;
export default function StepperDemo() {
  const [value, setValue] = useState<number>();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#000' }}>
        <WingBlank>
          <Text>您输入的是：{value}</Text>
          <Box>
            <WhiteSpace />
            <Text>最大值20，最小值0，步进3</Text>
            <WhiteSpace />
            <Stepper step={3} max={20} min={0} value={value} onChange={value => setValue(value)} />
            <WhiteSpace />
            <Text>不显示清除图标</Text>
            <WhiteSpace />
            <Stepper allowClear={false} />
            <WhiteSpace />
            <Text>禁用</Text>
            <WhiteSpace />
            <Stepper disabled />
            <WhiteSpace />
            <Text>允许用户输入</Text>
            <WhiteSpace />
            <Stepper width={px(100)} allowClear={false} editable />
            <WhiteSpace />
            <Text>不允许用户输入</Text>
            <WhiteSpace />
            <Stepper width={px(100)} editable={false} />
          </Box>
        </WingBlank>
      </ScrollView>
    </Container>
  );
}
