import React, { ReactElement, PropsWithChildren } from 'react';
import { useCreation } from '@td-design/rn-hooks';
import { AvatarProps } from '../type';
import helpers from '../../helpers';
import Image from '../../image';
import Text from '../../text';

const { px } = helpers;
export default function useAvatar(props: PropsWithChildren<AvatarProps>) {
  const {
    url,
    size = px(46),
    borderRadius = 0,
    circular = true,
    title,
    textStyle,
    showProgress = true,
    children: childrenProp,
  } = props;

  /** icon的长宽 */
  const width = size;
  const height = size;

  /** 获取有效的children */
  const children = React.Children.toArray(childrenProp).filter(child => {
    return React.isValidElement(child);
  }) as Array<ReactElement>;

  /** 挂件的大小 */
  const accessorySize = useCreation(() => ((Math.sqrt(2) - 1) * width) / Math.sqrt(2), [width]);

  /** 头像的弧度 */
  const avatarRadius = useCreation(() => (circular ? width / 2 : borderRadius), [circular, width, borderRadius]);

  const avatarReader = useCreation(() => {
    if (!!title) {
      return (
        <Text variant="p0" textAlign="center" color="gray500" style={textStyle}>
          {title}
        </Text>
      );
    }
    if (!!url) {
      const source = typeof url === 'string' ? { uri: url } : url;
      return (
        <Image showProgress={showProgress} source={source} style={{ width, height, borderRadius: avatarRadius }} />
      );
    }
    return null;
  }, [title, url, textStyle, showProgress, width, height, avatarRadius]);

  return {
    width,
    height,
    children,
    accessorySize,
    avatarRadius,
    avatarReader,
  };
}
