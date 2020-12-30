import React from 'react';
import { StyleSheet, View } from 'react-native';
import Image from '../../image';
import Icon from '../../icon';
import { px } from '../../helper';
import { AccessoryProps } from '../type';

const Accessory = ({ size = px(14), url, icon, component, top = false, left = false }: AccessoryProps) => {
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
    if (icon) {
      return <Icon {...icon} size={size} />;
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
