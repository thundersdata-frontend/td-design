import React from 'react';
import { TapRating, SwipeRating } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      {/* <TapRating count={5} selectedColor="red" /> */}
      <SwipeRating
        count={5}
        defaultRating={0}
        fractions={2}
        type="rocket"
        tintColor="gold"
        onFinishRating={position => {
          console.log(position);
        }}
      />
    </Container>
  );
};
