import React, { FC, isValidElement, cloneElement, Children, ReactElement } from 'react';
import { AvatarGroupProps } from '../type';
import Avatar from '../Avatar';
import Flex from '../../flex';
import { px } from '../../helper';

const AvatarGroup: FC<AvatarGroupProps> = props => {
  const { children: childrenProp, max = 4, spacing = px(23), textStyle, backgroundColor } = props;
  /** 有效的自节点 */
  const children = Children.toArray(childrenProp).filter(child => {
    return isValidElement(child);
  }) as Array<ReactElement>;
  /** 额外的头像尾巴 */
  const extraAvatars = children.length > max ? children.length - max + 1 : 0;
  /** 头像的间距 */
  const marginLeft = -spacing;

  return (
    <Flex>
      {children.slice(0, children.length - extraAvatars).map((child, index) => {
        return cloneElement(child, {
          className: child.props.className,
          containerStyle: {
            marginLeft: index === 0 ? 0 : marginLeft,
            ...child.props.containerStyle,
          },
          circular: true,
        });
      })}
      {extraAvatars ? (
        <Avatar
          circular
          containerStyle={{ marginLeft }}
          title={'+' + extraAvatars}
          textStyle={textStyle}
          backgroundColor={backgroundColor}
        />
      ) : null}
    </Flex>
  );
};
export default AvatarGroup;
