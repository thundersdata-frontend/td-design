import React from 'react';
import { Box, Progress, WhiteSpace, WingBlank } from '@td-design/react-native';

export default function ProgressDemo() {
  return (
    <WingBlank>
      <Box>
        <Progress type="line" value={0.7} />
        <Progress type="line" value={0.4} />
        <Progress type="line" value={1} label={{ show: true, position: 'top' }} />
        <Progress type="line" value={0.87} color={['#FFD080', 'red']} label={{ show: true, position: 'top' }} />
        <Progress type="line" value={0.87} color={['#FFD080', 'red']} />
        <Progress type="line" value={0.4} strokeWidth={16} />
        <WhiteSpace />
        <Progress value={0.4} label={{ show: false }} />
        <WhiteSpace />
        <Progress value={0.8} />
        <WhiteSpace />
        <Progress value={1} />
        <WhiteSpace />
        <Progress value={0.5} color="red" bgColor="green" />
        <WhiteSpace />
        <Progress value={0.7} color={['#FFD080', 'red']} />
        <WhiteSpace />
        <Progress value={0.7} strokeWidth={16} />
      </Box>
    </WingBlank>
  );
}
