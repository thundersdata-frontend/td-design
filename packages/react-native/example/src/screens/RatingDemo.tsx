import React from 'react';
import { TapRating, SwipeRating, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

export default () => {
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TapRating count={5} rating={4} onFinishRating={position => console.log(position)} />
        <WhiteSpace />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <SwipeRating
            rating={2.2}
            size={68}
            fractions={0}
            // tintColor="red"
            onFinishRating={position => {
              console.log(position);
            }}
          />
        </View>
      </View>
    </Container>
  );
};
