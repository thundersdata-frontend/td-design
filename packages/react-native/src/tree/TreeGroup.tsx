import { PropsWithChildren } from 'react';
import React from 'react';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import Checkbox from './Checkbox';
import Chevron from './Chevron';
import { TreeItemProps, TreeProps } from './type';
import useGroup from './useGroup';
import { useTree } from './useTree';

export default function TreeGroup({
  id,
  text,
  disabled,
  style,
  textStyle,
  onPress,
  customCheckIcon,
  customExpandIcon,
  checkable,
  level,
  activeOpacity,
  nodeStyle,
  currentKeys,
  openedKeys,
  handleCheck,
  handleExpand,
  flatData,
  children,
}: PropsWithChildren<
  Pick<TreeProps, 'customExpandIcon' | 'checkable' | 'activeOpacity' | 'nodeStyle'> &
    Omit<TreeItemProps, 'items'> &
    ReturnType<typeof useTree> & { level: number }
>) {
  const theme = useTheme<Theme>();
  const { bodyStyle, progress, checkStatus, handleLayout, handlePress } = useGroup({
    id,
    openedKeys,
    currentKeys,
    flatData,
    handleExpand,
  });

  return (
    <Box style={[{ marginLeft: level * theme.spacing.x2 }]}>
      <Flex alignItems={'center'} style={[nodeStyle, style]}>
        <Pressable activeOpacity={activeOpacity} onPress={handlePress}>
          <Box marginRight={'x1'} width={20} height={20} justifyContent={'center'} alignItems={'center'}>
            {customExpandIcon ? customExpandIcon(progress) : <Chevron {...{ progress }} />}
          </Box>
        </Pressable>
        {checkable && (
          <Pressable
            activeOpacity={activeOpacity}
            onPress={() => handleCheck(id)}
            disabled={disabled}
            style={{ marginRight: theme.spacing.x1 }}
          >
            {customCheckIcon ? customCheckIcon(checkStatus) : <Checkbox disabled={disabled} checked={checkStatus} />}
          </Pressable>
        )}
        <Pressable activeOpacity={activeOpacity} onPress={() => onPress?.(id)} disabled={disabled}>
          <Text variant={'p0'} color={disabled ? 'gray300' : 'gray500'} style={textStyle}>
            {text}
          </Text>
        </Pressable>
      </Flex>
      <Animated.View style={[{ position: 'relative', overflow: 'hidden' }, bodyStyle]}>
        <Box position={'absolute'} width="100%" collapsable={false} onLayout={handleLayout}>
          {children}
        </Box>
      </Animated.View>
    </Box>
  );
}
