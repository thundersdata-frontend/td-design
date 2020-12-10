import React from 'react';
import { View } from 'react-native';
import { WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <View style={{ flex: 1 }}>
        <View style={{ height: 50, backgroundColor: 'red' }} />
        <WhiteSpace size="m" />
        <View style={{ height: 50, backgroundColor: 'gold' }} />
      </View>
    </Container>
  );
};
