import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Theme } from '../../theme';
import { AvatarProps } from '../type';
import useAvatar from './useAvatar';

const Avatar: FC<AvatarProps> = props => {
  const theme = useTheme<Theme>();
  const { onPress, activeOpacity = 0.5, backgroundColor = theme.colors.background, containerStyle } = props;
  const { width, height, children, accessorySize, avatarRadius, avatarReader } = useAvatar(props);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={!onPress}
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
      {avatarReader}
      {children.map(child => {
        return React.cloneElement(child, {
          size: accessorySize,
          className: child.props.className,
          circular: true,
        });
      })}
    </TouchableOpacity>
  );
};

export default Avatar;
