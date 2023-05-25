import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  color,
  ColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  useTheme,
} from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import useTag from './useTag';

type TagSize = 'large' | 'middle' | 'small';
export interface TagProps {
  text: string;
  /** 标签大小，决定padding的大小 */
  size?: TagSize;
  /** 是否背景镂空 */
  ghost?: boolean;
  /** 设置禁用 */
  disabled?: boolean;
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否可选中 */
  selectable?: boolean;
  /** 设置标签的选中状态 */
  selected?: boolean;
  /** 点击关闭的回调函数 */
  onClose?: () => void;
  /** 点击标签的回调函数 */
  onSelect?: (selected: boolean) => void;
}

type BaseTagProps = BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  LayoutProps<Theme> &
  TypographyProps<Theme>;
const BaseTag = createRestyleComponent<BaseTagProps, Theme>([border, backgroundColor, color, layout, typography]);

const { px, ONE_PIXEL } = helpers;
const Tag: FC<TagProps & BaseTagProps> = ({
  text,
  size = 'middle',
  ghost = false,
  closable = false,
  selectable = true,
  disabled = false,
  selected = false,
  onClose,
  onSelect,
  ...restProps
}) => {
  const theme = useTheme<Theme>();

  const { handleDelete, handlePress, checked, closed } = useTag({ selected, disabled, selectable, onClose, onSelect });

  if (closed) return null;

  const styles = StyleSheet.create({
    iconBtn: {
      position: 'absolute',
      width: px(8),
      height: px(8),
      top: -px(4),
      right: -px(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconWrap: {
      backgroundColor: theme.colors.gray100,
      borderRadius: px(8),
    },
    check: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  });

  /** 删除的图标组件 */
  const renderClosableIcon = () => {
    if (closable && !disabled)
      return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => handleDelete()} style={styles.iconBtn}>
          <Box style={styles.iconWrap}>
            <SvgIcon name="close" color={theme.colors.white} size={px(10)} />
          </Box>
        </TouchableOpacity>
      );
    return null;
  };

  /** 选中的图标组件 */
  const renderCheckedIcon = () => {
    if (checked)
      return (
        <Box style={styles.check}>
          <Svg viewBox="0 0 1040 1024" width={px(28)} height={px(28)}>
            <Path
              d="M1023.83 474.655l-549.255 549.283h549.255V474.655zM783.16 979.732l-96.896-96.933 36.335-36.35 60.56 60.583L952.729 737.4l36.335 36.35L783.16 979.731z"
              fill={theme.colors.primary200}
            />
          </Svg>
        </Box>
      );
    return null;
  };

  const {
    fontFamily,
    fontSize = px(12),
    fontStyle,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textTransform,
    color = disabled ? 'gray300' : 'primary100',
    backgroundColor,
    borderWidth = ONE_PIXEL,
    justifyContent = 'center',
    alignItems = 'center',
    borderRadius = 'x1',
    ...rest
  } = restProps;

  let borderColor = rest.borderColor ?? color;
  if (ghost && disabled) {
    borderColor = 'disabled';
  } else if (checked) {
    borderColor = 'primary200';
  }

  const { paddingHorizontal, paddingVertical } = getBySize(size);

  return (
    <Box>
      <TouchableOpacity disabled={disabled} activeOpacity={0.5} onPress={handlePress}>
        <BaseTag
          {...rest}
          {...{
            justifyContent,
            alignItems,
            borderColor,
            borderWidth,
            borderRadius,
            paddingVertical,
            paddingHorizontal,
          }}
          {...{ backgroundColor: ghost ? 'transparent' : backgroundColor }}
        >
          <Text
            {...{
              fontFamily,
              fontSize,
              fontStyle,
              fontWeight,
              letterSpacing,
              lineHeight,
              textAlign,
              textDecorationLine,
              textDecorationStyle,
              textTransform,
              color,
            }}
          >
            {text}
          </Text>
        </BaseTag>
      </TouchableOpacity>
      {renderClosableIcon()}
      {renderCheckedIcon()}
    </Box>
  );
};
Tag.displayName = 'Tag';

export default Tag;

function getBySize(size: TagSize) {
  switch (size) {
    case 'large':
      return {
        paddingHorizontal: px(16),
        paddingVertical: px(8),
      };

    case 'middle':
    default:
      return {
        paddingHorizontal: px(12),
        paddingVertical: px(6),
      };

    case 'small':
      return {
        paddingHorizontal: px(4),
        paddingVertical: px(4),
      };
  }
}
