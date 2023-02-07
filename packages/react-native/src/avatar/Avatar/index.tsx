import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import Image from '../../image';
import Text from '../../text';
import { Theme } from '../../theme';
import { AvatarProps } from '../type';
import useAvatar from './useAvatar';

const Avatar: FC<AvatarProps> = ({ title, url, textStyle, showProgress = true, ...props }) => {
  const theme = useTheme<Theme>();
  const { onPress, activeOpacity = 0.5, backgroundColor = theme.colors.background, containerStyle } = props;
  const { width, height, children, accessorySize, avatarRadius } = useAvatar(props);

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
      {!!title && !url && (
        <Text variant="p0" textAlign="center" color="gray500" style={textStyle}>
          {title}
        </Text>
      )}
      {!!url && !title && (
        <Image
          showProgress={showProgress}
          source={typeof url === 'string' ? { uri: url } : url}
          style={{ width, height, borderRadius: avatarRadius }}
          resizeMode="cover"
        />
      )}
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
Avatar.displayName = 'Avatar';

export default Avatar;
