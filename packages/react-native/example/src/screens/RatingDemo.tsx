import React from 'react';
import { TapRating, SwipeRating, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <TapRating count={5} selectedColor="red" />
      <WhiteSpace />
      <SwipeRating
        count={5}
        defaultRating={2.2}
        fractions={0}
        // tintColor="gold"
        onFinishRating={position => {
          console.log(position);
        }}
      />
    </Container>
  );
};
