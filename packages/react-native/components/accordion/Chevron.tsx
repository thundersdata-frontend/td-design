import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { mix } from 'react-native-redash';
import Icon from '../icon';

const Chevron: FC<{ transition: Animated.Node<number> }> = ({ transition }) => {
  const rotateZ = mix(transition, Math.PI, 0);

  return (
    <Animated.View style={[styles.container, { transform: [{ rotateZ }] }]}>
      <Icon name="chevron-down" type="feather" color="black" size={24} />
    </Animated.View>
  );
};

export default Chevron;

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
