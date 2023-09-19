import React, { memo } from 'react';

import { useTheme } from '@shopify/restyle';

import Flex from '../flex';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import Checkbox from './Checkbox';
import { TreeItemProps, TreeProps } from './type';
import { useTree } from './useTree';

const TreeNode = ({
  id,
  text,
  disabled,
  onPress,
  style,
  textStyle,
  customCheckIcon,
  level,
  activeOpacity,
  nodeStyle,
  checkable,
  handleCheck,
  currentKeys,
}: TreeItemProps &
  Pick<TreeProps, 'checkable' | 'activeOpacity' | 'nodeStyle'> &
  Pick<ReturnType<typeof useTree>, 'currentKeys' | 'handleCheck'> & { level: number }) => {
  const theme = useTheme<Theme>();

  const checked = currentKeys.includes(id);
  const checkedStatus = checked ? 'all' : 'none';

  return (
    <Flex
      style={[
        {
          marginLeft: level * theme.spacing.x2,
        },
        nodeStyle,
        style,
      ]}
    >
      {checkable && (
        <Pressable
          activeOpacity={activeOpacity}
          disabled={disabled}
          onPress={() => handleCheck(id)}
          style={{ marginRight: theme.spacing.x1 }}
        >
          {customCheckIcon ? customCheckIcon(checkedStatus) : <Checkbox disabled={disabled} checked={checkedStatus} />}
        </Pressable>
      )}
      <Pressable activeOpacity={activeOpacity} onPress={() => onPress?.(id)} disabled={disabled}>
        <Text variant="p0" color={disabled ? 'disabled' : checked ? 'primary200' : 'text'} style={textStyle}>
          {text}
        </Text>
      </Pressable>
    </Flex>
  );
};
TreeNode.displayName = 'TreeNode';

export default memo(TreeNode);
