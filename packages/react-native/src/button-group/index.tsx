import React, { FC } from 'react';
import { Keyboard, StyleProp, ViewStyle } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import { Spacing } from '../theme';
import ButtonItem, { ButtonGroupOption } from './Item';

export interface ButtonGroupProps {
  /** 指定可选项 */
  options: ButtonGroupOption[];
  /** 尺寸 */
  size?: Spacing;
  /** 设置禁用的项，值为options的数组下标 */
  disabledItems?: number[];
  /** 默认处于点击状态的Item，值为 options 的数组下标 */
  activeIndex?: number;
  /** 自定义Item样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 未禁用时的不透明度 */
  activeOpacity?: number;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  disabledItems = [],
  containerStyle,
  options = [],
  activeIndex,
  itemStyle,
  size,
  activeOpacity = 0.6,
}) => {
  const [active, setActive] = useSafeState(activeIndex);

  if (options.length === 0) return null;

  const handlePress = useMemoizedFn(index => {
    Keyboard.dismiss();
    setActive(index);
  });

  return (
    <Box style={containerStyle}>
      <Flex flexWrap="nowrap">
        {options.map((item, index, array) => (
          <ButtonItem
            key={index}
            {...item}
            {...{ activeOpacity }}
            index={index}
            size={size}
            disabled={disabledItems.includes(index)}
            onItemPress={handlePress}
            itemStyle={itemStyle}
            isCurrent={active === index}
            isFirst={index === 0}
            isLast={index === array.length - 1}
          />
        ))}
      </Flex>
    </Box>
  );
};
ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
