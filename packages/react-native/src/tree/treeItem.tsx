import React, { FC, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { px, ONE_PIXEL } from '../helper';
import Flex from '../flex';
import Icon from '../icon';
import Text from '../text';
import Box from '../box';
import { EventDataNode, DataNode } from './type';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import Chevron from './Chevron';

// import { useTransition } from 'react-native-redash';
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
  switcherIcon?: boolean;
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
  switcherIcon = true,
  icon: customIcon,
  show,
}) => {
  const theme = useTheme<Theme>();

  const progress = useDerivedValue(() => (expanded ? withSpring(1) : withTiming(0)));
  const heightProgress = useDerivedValue(() => (!!show ? withSpring(1) : withTiming(0)));

  // tree item 高度变化
  const height = px(55);
  const style = useAnimatedStyle(() => ({
    height: height * Math.min(heightProgress.value, 1),
  }));

  const iconRender = (checked: boolean) => {
    if (customIcon) {
      return customIcon(checked);
    }
    return (
      <Icon
        size={px(16)}
        type="material"
        name={checked ? 'check-circle' : 'radio-button-unchecked'}
        ratio={1}
        color={checked ? theme.colors.link : theme.colors.border}
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
        backgroundColor="white"
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor="tree_disabled"
        paddingHorizontal="m"
      >
        <Flex alignItems="center" flex={1} style={{ marginLeft: level * px(16) }}>
          <TouchableOpacity disabled={disabled} onPress={handlerCheck}>
            {checkable && iconRender(checked)}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginLeft: px(3) }}
            onPress={() => {
              onClick?.({ expanded, key: data.key, title, checked, disabled });
            }}
          >
            <Text variant="hint3" color={disabled ? 'tree_disabled' : 'contentText_4'}>
              {title}
            </Text>
          </TouchableOpacity>
          {data.children && switcherIcon && (
            <Chevron {...{ progress }}>
              <Icon size={px(10)} name="down" ratio={1} />
            </Chevron>
          )}
        </Flex>
      </Box>
    </Animated.View>
  );
};

export default TreeItem;
