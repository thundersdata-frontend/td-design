import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { px } from '../../helper';
import { Theme } from '../../config/theme';
import Image from '../../image';
import { AvatarProps } from '../type';

const Avatar: FC<AvatarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    onPress,
    activeOpacity = 0.2,
    url,
    size = px(46),
    borderRadius = 0,
    circular = true,
    title,
    textStyle,
    backgroundColor = theme.colors.backgroundColor1,
    containerStyle,
    children: childrenProp,
  } = props;

  /** 获取有效的children */
  const children = React.Children.toArray(childrenProp).filter(child => {
    return React.isValidElement(child);
  }) as Array<ReactElement>;

  /** icon的长宽 */
  const width = size;
  const height = size;

  /** 挂件的大小 */
  const accessorySize = ((Math.sqrt(2) - 1) * width) / Math.sqrt(2);

  /** 头像的弧度 */
  const avatarRadius = circular ? width / 2 : borderRadius;

  const avatarReader = () => {
    if (!!title) {
      return <Text style={[{ color: theme.colors.white, textAlign: 'center' }, textStyle]}>{title}</Text>;
    }
    if (!!url) {
      const source = typeof url === 'string' ? { uri: url } : url;
      return (
        <Image
          source={source}
          style={{ width, height }}
          borderRadius={avatarRadius}
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    }
    return null;
  };

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
      {avatarReader()}
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
