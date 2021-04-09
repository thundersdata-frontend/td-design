import React, { FC, ReactNode, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createRestyleComponent, createVariant, useTheme, VariantProps } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Box from '../box';
import Text from '../text';

import { px } from '../helper';
import Icon from '../icon';
import Color from 'color';

type Props = VariantProps<Theme, 'tagVariants'> & { children: ReactNode };
const BaseTag = createRestyleComponent<Props, Theme>([createVariant({ themeKey: 'tagVariants' })]);

type TagProps = {
  /** 标签的大小 */
  size?: 'large' | 'middle' | 'small';
  /** 设置标签类型 */
  type?: 'primary' | 'secondary' | 'ghost';
  /** 设置禁用 */
  disabled?: boolean;
  /** 标签背景色 */
  background?: string;
  /** 标签文字颜色 */
  color?: string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 设置标签的选中状态 */
  checked?: boolean;
  /** 点击关闭的回调函数 */
  onClose?: () => void;
  /** 点击标签的回调函数 */
  onChange?: (selected: boolean) => void;
};

function genTagTextFont(size: string) {
  switch (size) {
    case 'large':
    default:
      return {
        fontSize: px(14),
        lineHeight: px(18),
      };

    case 'middle':
      return {
        fontSize: px(12),
        lineHeight: px(18),
      };

    case 'small':
      return {
        fontSize: px(10),
        lineHeight: px(12),
      };
  }
}

function getTagTextColor(color: string, disabled: boolean) {
  if (disabled) return Color(color).alpha(0.6).string();
  return color;
}

const selectSizeMap = {
  large: px(30),
  middle: px(26),
};

const Tag: FC<TagProps> = ({
  children,
  closable = false,
  disabled = false,
  checked = false,
  type = 'primary',
  size = 'middle',
  background,
  color,
  onClose,
  onChange,
}) => {
  const theme = useTheme<Theme>();
  const [selected, setSelected] = useState(checked);
  const [closed, setClosed] = useState(false);

  /** 点击事件 */
  const handlePress = () => {
    if (disabled) {
      return;
    }
    setSelected(!selected);
    onChange?.(!selected);
  };

  /** 删除事件 */
  const handleDelete = () => {
    setClosed(!closed);
    onClose?.();
  };

  /** 删除的图标组件 */
  const closableDom =
    closable && !disabled ? (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleDelete()}
        style={{
          position: 'absolute',
          width: px(8),
          height: px(8),
          top: -px(4),
          right: -px(4),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            backgroundColor: theme.colors.tag_background_icon,
            borderRadius: px(8),
          }}
        >
          <Icon name="close" color={theme.colors.tag_icon} size={px(10)} />
        </Box>
      </TouchableOpacity>
    ) : null;

  /** 选中的图标组件 */
  const checkedDom =
    selected && !disabled ? (
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Svg viewBox="0 0 1040 1024" width={selectSizeMap[size]} height={selectSizeMap[size]}>
          <Path
            d="M1023.83 474.655l-549.255 549.283h549.255V474.655zM783.16 979.732l-96.896-96.933 36.335-36.35 60.56 60.583L952.729 737.4l36.335 36.35L783.16 979.731z"
            fill={theme.colors.tag_background_check}
          />
        </Svg>
      </Box>
    ) : null;

  if (closed) {
    return null;
  }

  /** 判断是否是线框标签 */
  const wrapStyle = type === 'ghost' && {
    borderWidth: 1,
    borderColor: disabled ? theme.colors.tag_border_disabled : theme.colors.tag_border,
  };

  /** 小标签单独处理 */
  const checkedStyle = selected && !disabled && { borderColor: theme.colors.tag_border };

  const baseTag = (
    <BaseTag variant={size}>
      <Text
        style={[genTagTextFont(size), { color: getTagTextColor(color ?? theme.colors[`tag_text_${type}`], disabled) }]}
      >
        {children}
      </Text>
    </BaseTag>
  );

  const smallContent = (
    <Box>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        onPress={() => handlePress()}
        style={
          disabled && { backgroundColor: theme.colors.tag_background_disabled, borderRadius: theme.borderRadii.base }
        }
      >
        <Box
          style={[
            { borderRadius: px(10), backgroundColor: background ?? theme.colors[`tag_background_${type}`] },
            wrapStyle,
            checkedStyle,
          ]}
        >
          {baseTag}
        </Box>
      </TouchableOpacity>
      {closableDom}
    </Box>
  );

  const regularContent = (
    <Box>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        onPress={() => handlePress()}
        style={
          disabled && { backgroundColor: theme.colors.tag_background_disabled, borderRadius: theme.borderRadii.base }
        }
      >
        <Box
          borderRadius="base"
          style={[{ backgroundColor: background ?? theme.colors[`tag_background_${type}`] }, wrapStyle]}
        >
          {baseTag}
        </Box>
      </TouchableOpacity>
      {closableDom}
      {checkedDom}
    </Box>
  );

  return (
    <Box
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        overflow: 'visible',
      }}
    >
      {size === 'small' ? smallContent : regularContent}
    </Box>
  );
};

export default Tag;
