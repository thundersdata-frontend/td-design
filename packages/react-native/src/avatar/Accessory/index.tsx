import React from 'react';
import { Image, StyleSheet } from 'react-native';

import Box from '../../box';
import helpers from '../../helpers';
import { AccessoryProps } from '../type';

const { px } = helpers;
const Accessory = ({ size = px(14), url, component, top = false, left = false }: AccessoryProps) => {
  /** 挂件的reader */
  const iconReader = () => {
    if (url) {
      const source = typeof url === 'string' ? { uri: url } : url;
      return (
        <Image
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          source={source}
          resizeMode="cover"
        />
      );
    }
    if (component) {
      return component;
    }
    return null;
  };
  /** 挂件的位置 */
  const styles = StyleSheet.create({
    position: {
      borderRadius: size / 2,
    },
    top: {
      top: 0,
    },
    bottom: {
      bottom: 0,
    },
    left: {
      left: 0,
    },
    right: {
      right: 0,
    },
  });

  return (
    <Box
      position={'absolute'}
      alignItems={'center'}
      justifyContent={'center'}
      width={size}
      height={size}
      style={StyleSheet.flatten([styles.position, top ? styles.top : styles.bottom, left ? styles.left : styles.right])}
    >
      {iconReader()}
    </Box>
  );
};
Accessory.displayName = 'Accessory';

export default Accessory;
