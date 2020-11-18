import React from 'react';
import { Box, Progress, WhiteSpace, WingBlank } from '@td-design/react-native';

export default function ProgressDemo() {
  return (
    <WingBlank>
      <Box>
        <Progress type="line" value={70} />
        <Progress type="line" value={40} />
        <Progress type="line" value={100} showLabel labelPosition="top" />
        <Progress type="line" value={87} color={['#FFD080', 'red']} showLabel labelPosition="top" />
        <Progress type="line" value={87} color={['#FFD080', 'red']} />
        <Progress type="line" value={100} strokeWidth={16} />
        <WhiteSpace />
        <Progress value={40} showLabel={false} />
        <WhiteSpace />
        <Progress value={80} />
        <WhiteSpace />
        <Progress value={100} />
        <WhiteSpace />
        <Progress value={50} color="red" bgColor="green" />
        <WhiteSpace />
        <Progress value={70} color={['#FFD080', 'red']} />
        <WhiteSpace />
        <Progress value={70} strokeWidth={16} />
      </Box>
    </WingBlank>
  );
}
