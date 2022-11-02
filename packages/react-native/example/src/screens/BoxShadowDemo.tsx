import React from 'react';
import { WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export default () => {
  return (
    <Container>
      <WhiteSpace />
      <WhiteSpace />
      <WingBlank>
        <Shadow distance={5} startColor={'#eb9066d8'} finalColor={'#ff00ff10'}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#c454f0dd',
            }}
          >
            <Text style={{ margin: 20, fontSize: 20 }}>🤯</Text>
          </View>
        </Shadow>
      </WingBlank>
    </Container>
  );
};
