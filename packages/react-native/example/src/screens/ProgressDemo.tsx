import React from 'react';
import { Box, Progress, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

const { CircleProgress, LineProgress } = Progress;
export default function ProgressDemo() {
  return (
    <Container>
      <WingBlank>
        <Box>
          <LineProgress value={70} />
          <LineProgress value={40} />
          <LineProgress value={100} showLabel labelPosition="top" />
          <LineProgress value={87} color={['#FFD080', 'red']} showLabel labelPosition="top" />
          <LineProgress value={87} color={['#FFD080', 'red']} />
          <LineProgress value={100} strokeWidth={16} />
          <WhiteSpace />
          <CircleProgress value={40} showLabel={false} />
          <WhiteSpace />
          <CircleProgress value={80} />
          <WhiteSpace />
          <CircleProgress value={100} />
          <WhiteSpace />
          <CircleProgress value={50} color="red" bgColor="green" />
          <WhiteSpace />
          <CircleProgress value={70} color={['#FFD080', 'red']} />
          <WhiteSpace />
          <CircleProgress value={70} strokeWidth={16} />
        </Box>
      </WingBlank>
    </Container>
  );
}
