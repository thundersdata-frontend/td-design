import React from 'react';
import { BoxShadow, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

export default () => {
  const shadowOpt = {
    width: 300,
    height: 40,
    opacity: 0.16,
    border: 12,
    radius: 20,
    color: '#0189fb',
  };

  return (
    <Container>
      <WhiteSpace />
      <WhiteSpace />
      <WingBlank>
        <BoxShadow setting={shadowOpt}>
          <View style={{ width: 100, height: 100, borderRadius: 20 }} />
        </BoxShadow>
      </WingBlank>
    </Container>
  );
};
