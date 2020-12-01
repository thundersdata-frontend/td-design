import React from 'react';
import { TapRating, SwipeRating } from '@td-design/react-native';
import { View } from 'react-native';

export default () => {
  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
};
