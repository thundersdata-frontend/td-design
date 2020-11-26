import React from 'react';
import { StyleSheet, View } from 'react-native';
import Image from '../image';
import Icon from '../icon';
import { AccessoryProps } from './type';

const Accessory = ({ size = 14, source, name, iconComponent }: AccessoryProps) => {
  const iconReader = () => {
    if (source) {
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
    if (name) {
      return <Icon size={size} name={name} rounded />;
    }
    if (iconComponent) {
      return iconComponent();
    }
  };

  return (
    <View
      style={StyleSheet.flatten([
        {
          position: 'absolute',
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ])}
    >
      <View>{iconReader()}</View>
    </View>
  );
};
export default Accessory;
