import React from 'react';
import { TapRating, SwipeRating, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

export default () => {
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TapRating count={5} />
        <WhiteSpace />
        <SwipeRating
          defaultRating={2.2}
          fractions={0}
          // tintColor="red"
          onFinishRating={position => {
            console.log(position);
          }}
        />
      </View>
    </Container>
  );
};
