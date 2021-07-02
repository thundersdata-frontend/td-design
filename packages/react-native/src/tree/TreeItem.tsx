import React, { FC, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import helpers from '../helpers';
import Flex from '../flex';
import Icon from '../icon';
import Text from '../text';
import Box from '../box';
import { EventDataNode, DataNode } from './type';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import Chevron from './Chevron';
import { mix } from 'react-native-redash';

const { ONE_PIXEL, px } = helpers;
export interface TreeNodeProps {
  /** 父节点的key */
  eventKey?: string;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否选中 */
  checked?: boolean;
  /** 标题 */
  title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
  /** 节点的数据 */
  data: DataNode;
  /** 是否显示展开图标 */
  showIcon?: boolean;
  /** 所属级别 */
  level: number;
  /** 是否可选 */
  checkable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件回调 */
  onClick?: (data: EventDataNode) => void;
  /** 选中事件回调 */
  onCheck?: (data: EventDataNode) => void;
  /** 自定义icon */
  icon?: (checked: boolean) => ReactNode;
  show?: boolean;
}
const TreeItem: FC<TreeNodeProps> = ({
  checkable = true,
  expanded = false,
  eventKey,
  title,
  checked = false,
  disabled,
  onClick,
  onCheck,
  data,
  level,
  showIcon = true,
  icon: customIcon,
  show,
}) => {
  const theme = useTheme<Theme>();

  const progress = useDerivedValue(() => (expanded ? withTiming(1) : withTiming(0)));
  const heightProgress = useDerivedValue(() => (!!show ? withTiming(1) : withTiming(0)));

  // tree item 高度变化
  const height = px(55);
  const style = useAnimatedStyle(() => {
    return {
      height: height * mix(heightProgress.value, 0, 1),
    };
  });

  const iconRender = (checked: boolean) => {
    if (customIcon) {
      return customIcon(checked);
    }
    return (
      <Icon
        size={px(20)}
        type="material"
        name={checked ? 'check-circle' : 'radio-button-unchecked'}
        ratio={1}
        color={checked ? theme.colors.primary200 : theme.colors.icon}
      />
    );
  };

  const handlerCheck = () => {
    onCheck?.({ expanded, key: data.key, eventKey, title, checked, disabled });
  };
  return (
    <Animated.View style={[{ overflow: 'hidden' }, style]}>
      <Box
        height={px(55)}
        backgroundColor="background"
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor="border"
        paddingHorizontal="x3"
      >
        <Flex alignItems="center" flex={1} style={{ marginLeft: level * px(16) }}>
          <TouchableOpacity disabled={disabled} onPress={handlerCheck}>
            {checkable && iconRender(checked)}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginLeft: px(4) }}
            disabled={disabled}
            onPress={() => {
              onClick?.({ expanded, key: data.key, title, checked, disabled });
            }}
          >
            <Text variant="p1" color={disabled ? 'disabled' : 'gray500'}>
              {title}
            </Text>
          </TouchableOpacity>
          {data.children && showIcon && (
            <Chevron {...{ progress }}>
              <Icon size={px(16)} color={theme.colors.icon} name="down" ratio={1} />
            </Chevron>
          )}
        </Flex>
      </Box>
    </Animated.View>
  );
};

export default TreeItem;
