import React from 'react';
import { View } from 'react-native';
import { WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <WingBlank size="xxl">
        <View style={{ height: 150, backgroundColor: 'red' }} />
      </WingBlank>
    </Container>
  );
};
