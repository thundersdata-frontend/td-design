import React, { FC } from 'react';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import Image from '../image';
import { AvatarProps } from './type';
import Accessory from './accessory';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '..';

const AvatarSizeList = {
  xs: px(36),
  md: px(46),
  lg: px(56),
};

const Avatar: FC<AvatarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    onPress,
    activeOpacity = 0.2,
    disabled = false,
    source,
    size = 'md',
    borderRadius = 0,
    AccessoryProps,
    circular = true,
    title,
    textStyle,
    backgroundColor = theme.colors.backgroundColor1,
    containerStyle,
  } = props;
  const avatarSize = typeof size === 'string' ? AvatarSizeList[size] : size;
  const width = avatarSize;
  const height = avatarSize;

  const accessorySize = ((Math.sqrt(2) - 1) * width) / Math.sqrt(2);
  const avatarRadius = circular ? width / 2 : borderRadius;
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      style={{
        position: 'relative',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderRadius: avatarRadius,
        ...containerStyle,
      }}
    >
      {title ? (
        <Text style={[{ color: '#fff', textAlign: 'center' }, textStyle]}>{title}</Text>
      ) : (
        <Image
          source={{ uri: source }}
          style={{ width, height }}
          borderRadius={avatarRadius}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
      <Accessory size={accessorySize} {...AccessoryProps} />
    </TouchableOpacity>
  );
};

export default Avatar;
