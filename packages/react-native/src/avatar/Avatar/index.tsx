import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Pressable from '../../pressable';
import Text from '../../text';
import { Theme } from '../../theme';
import { AvatarProps } from '../type';
import useAvatar from './useAvatar';

const Avatar: FC<AvatarProps> = ({ title, url, textStyle, ...props }) => {
  const theme = useTheme<Theme>();
  const { onPress, activeOpacity = 0.6, backgroundColor = theme.colors.white, containerStyle } = props;
  const { width, height, avatarRadius } = useAvatar(props);

  const styles = StyleSheet.create({
    avatar: {
      position: 'relative',
      width,
      height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor,
      borderRadius: avatarRadius,
      ...containerStyle,
    },
  });

  const renderImage = () => {
    if (!!url)
      return (
        <Image
          source={typeof url === 'string' ? { uri: url } : url}
          style={{ width, height, borderRadius: avatarRadius }}
          resizeMode="cover"
        />
      );
    if (!!title)
      return (
        <Text variant="p0" textAlign="center" color="gray500" style={textStyle}>
          {title}
        </Text>
      );
    return null;
  };

  return (
    <Pressable activeOpacity={activeOpacity} disabled={!onPress} onPress={onPress} style={styles.avatar}>
      {renderImage()}
    </Pressable>
  );
};
Avatar.displayName = 'Avatar';

export default Avatar;
