import React, { FC, ReactNode, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { generate } from '@ant-design/colors';
import { BackgroundColorProps, createRestyleComponent, createVariant, useTheme, VariantProps } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Box from '../box';
import Text from '../text';

import { px } from '../helper';
import Icon from '../icon';

type TagProps = BackgroundColorProps<Theme> & {
  /** 标签的大小 */
  size?: 'large' | 'small' | 'middle';
  /** 设置标签类型 */
  type?: 'ghost' | 'primary' | 'default';
  /** 设置禁用 */
  disabled?: boolean;
  /** 指定标签颜色 */
  color?: string;
  /** 可关闭 */
  closable?: boolean;
  /** 设置标签的选中状态 */
  checked?: boolean;
  /** 点击关闭的回调函数 */
  onClose?: () => void;
  /** 点击标签的回调函数 */
  onChange?: (selected: boolean) => void;
};

const Tag: FC<TagProps> = ({
  children,
  closable = false,
  disabled = false,
  checked = false,
  size = 'middle',
  type = 'default',
  color,
  onClose,
  onChange,
}) => {
  const ref = useRef(null);
  const theme = useTheme<Theme>();

  const [selected, setSelected] = useState(checked);
  const [closed, setClosed] = useState(true);

  type Props = BackgroundColorProps<Theme> & VariantProps<Theme, 'tagVariants'> & { children: ReactNode };
  const Tag = createRestyleComponent<Props, Theme>([createVariant({ themeKey: 'tagVariants' })]);

  /** 点击事件 */
  const handlePress = () => {
    if (disabled) {
      return;
    }
    setSelected(!selected);
    if (onChange) {
      onChange(!selected);
    }
  };

  /** 删除事件 */
  const handleDelete = () => {
    setClosed(!closed);
    if (onClose) {
      onClose();
    }
  };

  /** 字体大小根据size计算 */
  const fontSizeMap = {
    small: px(10),
    large: px(14),
    default: px(12),
  };

  /** 背景色和字体颜色计算 */
  const colors = color ? generate(color) : [];
  let bgColor = theme.colors.tagBgColor;
  let fontColor = theme.colors.tagTextColor;
  if (type === 'primary') {
    bgColor = theme.colors.secondaryColor;
    fontColor = theme.colors.primaryColor;
  }
  if (color) {
    bgColor = colors.length ? colors[0] : theme.colors.tagBgColor;
    fontColor = color || theme.colors.tagTextColor;
  }
  if (disabled) {
    bgColor = theme.colors.disabledBgColor;
    fontColor = theme.colors.closedBgColor;
  }

  /** 删除的图标组件 */
  const closableDom =
    closable && !disabled ? (
      <TouchableWithoutFeedback onPress={() => handleDelete()}>
        <Box
          ref={ref}
          style={{
            position: 'absolute',
            backgroundColor: theme.colors.closedTagColor,
            borderRadius: px(50),
            top: -px(7),
            right: -px(7),
          }}
        >
          <Icon name="close" color={theme.colors.white} size={16} />
        </Box>
      </TouchableWithoutFeedback>
    ) : null;

  /** 选中的图标组件 */
  const checkedDom =
    selected && !disabled ? (
      <Box
        ref={ref}
        style={{
          position: 'absolute',
          bottom: -1,
          right: -1,
        }}
      >
        <Svg className="prefix__icon" viewBox="0 0 1040 1024" width={px(30)} height={px(30)}>
          <Path
            d="M1023.83 474.655l-549.255 549.283h549.255V474.655zM783.16 979.732l-96.896-96.933 36.335-36.35 60.56 60.583L952.729 737.4l36.335 36.35L783.16 979.731z"
            fill={fontColor}
          />
        </Svg>
      </Box>
    ) : null;

  if (!closed) {
    return null;
  }

  /** 判断是否是线框标签 */
  const wrapStyle = type === 'ghost' ? { borderWidth: 1, borderColor: fontColor } : { backgroundColor: bgColor };

  /** 小标签单独处理 */
  const checkedStyle = selected && !disabled ? { borderColor: fontColor } : {};
  const smallTagContent = (
    <Box style={[{ borderWidth: 1, borderColor: bgColor, borderRadius: px(10) }, wrapStyle, checkedStyle]}>
      <Tag variant={size}>
        <Text fontSize={fontSizeMap[size]} style={fontColor ? { color: fontColor } : {}}>
          {children}
        </Text>
      </Tag>
      {closableDom}
    </Box>
  );

  return (
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      <Box
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          overflow: 'visible',
        }}
      >
        {size === 'small' ? (
          smallTagContent
        ) : (
          <Box style={[{ borderWidth: 1, borderColor: bgColor, borderRadius: px(3) }, wrapStyle]}>
            <Tag variant={size}>
              <Text fontSize={fontSizeMap[size]} style={fontColor ? { color: fontColor } : {}}>
                {children}
              </Text>
            </Tag>
            {closableDom}
            {checkedDom}
          </Box>
        )}
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default Tag;
