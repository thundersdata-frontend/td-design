import React, { FC, ReactNode, useState, useMemo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createRestyleComponent, createVariant, useTheme, VariantProps, BorderProps, border } from '@shopify/restyle';

import { Theme } from '../theme';
import Box from '../box';
import Text from '../text';
import helpers from '../helpers';
import Icon from '../icon';

const { px, ONE_PIXEL } = helpers;

type Props = VariantProps<Theme, 'tagVariants'> &
  BorderProps<Theme> & { style: StyleProp<ViewStyle> } & { children: ReactNode };
const BaseTag = createRestyleComponent<Props, Theme>([border, createVariant({ themeKey: 'tagVariants' })]);

type TagProps = {
  /** 标签的大小 */
  size?: 'large' | 'middle' | 'small';
  /** 标签类型 */
  type?: 'default' | 'ghost';
  /** 设置禁用 */
  disabled?: boolean;
  /** 标签背景色 */
  backgroundColor?: string;
  /** 标签文字颜色 */
  color?: string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 设置标签的选中状态 */
  selected?: boolean;
  /** 点击关闭的回调函数 */
  onClose?: () => void;
  /** 点击标签的回调函数 */
  onSelect?: (selected: boolean) => void;
};

const Tag: FC<TagProps> = ({
  children,
  closable = false,
  disabled = false,
  selected = false,
  type = 'primary',
  size = 'middle',
  backgroundColor,
  color,
  onClose,
  onSelect,
}) => {
  const theme = useTheme<Theme>();
  const [checked, setChecked] = useState(selected);
  const [closed, setClosed] = useState(false);

  const textFontSize = useMemo(() => {
    switch (size) {
      case 'large':
      default:
        return px(14);

      case 'middle':
        return px(12);

      case 'small':
        return px(10);
    }
  }, [size]);

  /** 边框宽度 */
  const borderWidth = useMemo(() => {
    if (type === 'ghost') return ONE_PIXEL;
    if (size === 'small' && checked) return 1;
    return 0;
  }, [checked, size, type]);

  /** 边框颜色 */
  const borderColor = useMemo(() => {
    if (type === 'ghost') return disabled ? 'disabled' : 'primary100';
    if (size === 'small' && checked) return 'primary200';
    return 'transparent';
  }, [disabled, checked, size, type]);

  /** 背景色 */
  const bgColor = useMemo(() => {
    if (backgroundColor) return backgroundColor;
    if (disabled) return theme.colors.gray700;
    if (type === 'ghost') return theme.colors.background;
    return theme.colors.primary50;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundColor, disabled, type]);

  /** 文字颜色 */
  const textColor = useMemo(() => {
    if (color) return color;
    if (disabled) return theme.colors.gray300;
    return theme.colors.primary100;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, disabled]);

  /** 点击事件 */
  const handlePress = () => {
    if (disabled) {
      return;
    }
    setChecked(!checked);
    onSelect?.(!checked);
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
            backgroundColor: theme.colors.gray100,
            borderRadius: px(8),
          }}
        >
          <Icon name="close" color={theme.colors.white} size={px(10)} />
        </Box>
      </TouchableOpacity>
    ) : null;

  /** 选中的图标组件 */
  const checkedDom =
    checked && size !== 'small' ? (
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Svg viewBox="0 0 1040 1024" width={px(28)} height={px(28)}>
          <Path
            d="M1023.83 474.655l-549.255 549.283h549.255V474.655zM783.16 979.732l-96.896-96.933 36.335-36.35 60.56 60.583L952.729 737.4l36.335 36.35L783.16 979.731z"
            fill={theme.colors.primary200}
          />
        </Svg>
      </Box>
    ) : null;

  const baseTag = (
    <BaseTag
      variant={size}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderRadius={size === 'small' ? 'x4' : 'x1'}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Text fontSize={textFontSize} style={{ color: textColor }}>
        {children}
      </Text>
    </BaseTag>
  );

  if (closed) return null;
  return (
    <Box>
      <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={handlePress}>
        {baseTag}
      </TouchableOpacity>
      {closableDom}
      {checkedDom}
    </Box>
  );
};

export default Tag;
