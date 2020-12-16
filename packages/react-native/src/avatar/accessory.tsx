import React from 'react';
import { StyleSheet, View } from 'react-native';
import Image from '../image';
import Icon from '../icon';
import { px } from '../helper';
import { AccessoryProps } from './type';

const Accessory = ({ size = px(14), url, icon, component, top = false, left = false }: AccessoryProps) => {
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
  const positionStyle = {};
  top ? (positionStyle['top'] = 0) : (positionStyle['bottom'] = 0);
  left ? (positionStyle['left'] = 0) : (positionStyle['right'] = 0);
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
