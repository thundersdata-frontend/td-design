import React from 'react';
import { ScrollView } from 'react-native';
import { Progress, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

const { CircleProgress, LineProgress } = Progress;
export default function ProgressDemo() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <LineProgress value={70} />
        <WhiteSpace />
        <LineProgress value={40} />
        <WhiteSpace />
        <LineProgress value={100} showLabel labelPosition="top" />
        <WhiteSpace />
        <LineProgress value={87} color={['#FFD080', 'red']} showLabel labelPosition="top" />
        <WhiteSpace />
        <LineProgress value={87} color={['#FFD080', 'red']} />
        <WhiteSpace />
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
      </ScrollView>
    </Container>
  );
}
