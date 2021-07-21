import React from 'react';
import { StyleSheet, View } from 'react-native';
import Image from '../../image';
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
        />
      );
    }
    if (component) {
      return component;
    }
    return null;
  };
  /** 挂件的位置 */

  const positionStyle = {};
  Object.assign(positionStyle, top ? { top: 0 } : { bottom: 0 });
  Object.assign(positionStyle, left ? { left: 0 } : { right: 0 });

  return (
    <View
      style={StyleSheet.flatten([
        {
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        positionStyle,
      ])}
    >
      <View>{iconReader()}</View>
    </View>
  );
};
export default Accessory;
