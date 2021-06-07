import React, { FC, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import helpers from '../../helpers';
import { Theme } from '../../theme';
import Image from '../../image';
import Text from '../../text';
import { AvatarProps } from '../type';

const { px } = helpers;
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
    backgroundColor = theme.colors.background,
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
      return (
        <Text variant="p0" textAlign="center" color="gray500" style={textStyle}>
          {title}
        </Text>
      );
    }
    if (!!url) {
      const source = typeof url === 'string' ? { uri: url } : url;
      return <Image source={source} style={{ width, height, borderRadius: avatarRadius }} />;
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
