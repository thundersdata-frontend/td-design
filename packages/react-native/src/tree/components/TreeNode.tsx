import React, { FC, memo } from 'react';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../../box';
import Flex from '../../flex';
import helpers from '../../helpers';
import Pressable from '../../pressable';
import SvgIcon from '../../svg-icon';
import Text from '../../text';
import { Theme } from '../../theme';
import { TreeNodeProps } from '../type';
import Chevron from './Chevron';
import { useTreeNode } from './useTreeNode';

const { ONE_PIXEL } = helpers;

const TreeNode: FC<TreeNodeProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon: customIcon,
    level,
    disabled,
    checkable,
    expanded = false,
    title,
    checked = false,
    data,
    showIcon,
  } = props;
  const { progress, handlerCheck, onClick } = useTreeNode(props);

  const iconRender = (checked: boolean) => {
    if (customIcon) {
      return customIcon(checked);
    }
    return (
      <SvgIcon
        name={checked ? 'checkcircle' : 'radio-unchecked'}
        color={checked ? theme.colors.primary200 : theme.colors.icon}
      />
    );
  };

  return (
    <Animated.View style={[{ overflow: 'hidden' }]}>
      <Pressable
        activeOpacity={0.6}
        disabled={disabled}
        onPress={() => {
          onClick?.({ expanded, key: data.key, title, checked, disabled });
        }}
        style={{
          backgroundColor: theme.colors.white,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: ONE_PIXEL,
          padding: theme.spacing.x2,
        }}
      >
        <Flex alignItems="center" style={{ marginLeft: level * theme.spacing.x4 }}>
          <Pressable disabled={disabled} onPress={handlerCheck}>
            {checkable && iconRender(checked)}
          </Pressable>
          <Box flex={1} marginLeft="x1">
            <Text variant="p1" color={disabled ? 'disabled' : 'gray500'}>
              {title}
            </Text>
          </Box>
          {!!data.children && !!showIcon && (
            <Chevron {...{ progress }}>
              <SvgIcon name="down" color={theme.colors.icon} />
            </Chevron>
          )}
        </Flex>
      </Pressable>
    </Animated.View>
  );
};
TreeNode.displayName = 'TreeNode';

export default memo(TreeNode);
