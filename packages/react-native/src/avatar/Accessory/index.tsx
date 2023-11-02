import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

import Box from '../../box';
import helpers from '../../helpers';
import { AccessoryProps } from '../type';

const { px } = helpers;
const Accessory = ({ size = px(14), url, component, top = false, left = false }: AccessoryProps) => {
  return (
    <Box
      position={'absolute'}
      alignItems={'center'}
      justifyContent={'center'}
      width={size}
      height={size}
      style={StyleSheet.flatten([
        { borderRadius: size / 2 },
        top ? styles.top : styles.bottom,
        left ? styles.left : styles.right,
      ])}
    >
      <Icon {...{ url, size, component }} />
    </Box>
  );
};
Accessory.displayName = 'Accessory';

/** 挂件的位置 */
const styles = StyleSheet.create({
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

export default Accessory;

const Icon = memo(({ url, size, component }: Pick<AccessoryProps, 'size' | 'url' | 'component'>) => {
  if (url) {
    const source = typeof url === 'string' ? { uri: url } : url;
    return (
      <Image
        style={{
          width: size,
          height: size,
          borderRadius: size! / 2,
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
});
