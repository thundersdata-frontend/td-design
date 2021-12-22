import React, { useState } from 'react';
import Container from '../components/Container';
import { ScrollNumber, Center, Button, Box, WhiteSpace } from '@td-design/react-native';

const customRange = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
export default function ScrollNumberDemo() {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState('零');

  const updateValue = () => {
    setValue(getRandom());
  };

  const updateValue2 = () => {
    let val = Math.ceil(Math.random() * 10);
    if (val >= 10) {
      val = 9;
    }
    if (val <= 1) {
      val = 1;
    }
    const randomValue = customRange[val];
    setValue2(randomValue);
  };

  return (
    <Container>
      <Center>
        <Box>
          <ScrollNumber
            value={value}
            height={100}
            animationType="spring"
            containerStyle={{
              width: 100,
              marginRight: 10,
              borderWidth: 1,
              borderColor: 'red',
            }}
            textStyle={{ fontSize: 80, color: '#0000ff' }}
          />
        </Box>
        <WhiteSpace size="x8" />
        <Box>
          <ScrollNumber value={value} />
        </Box>
        <WhiteSpace size="x8" />
        <Box>
          <ScrollNumber value={value} textStyle={{ fontSize: 80, color: '#0000ff' }} />
        </Box>
        <WhiteSpace size="x8" />
        <Box>
          <ScrollNumber numberRange={customRange} value={value2} textStyle={{ fontSize: 80, color: '#ff0000' }} />
        </Box>
      </Center>
      <Button title="修改value" onPress={updateValue} />
      <Button title="修改自定义value" onPress={updateValue2} />
    </Container>
  );
}

const getRandom = () => parseInt((Math.random() * 100).toFixed(0), 10);
