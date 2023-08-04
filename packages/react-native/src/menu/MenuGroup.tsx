import React, { PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import Chevron from './Chevron';
import { MenuItemProps } from './type';
import useGroup from './useGroup';

const { ONE_PIXEL } = helpers;

const MenuGroup = ({
  activeOpacity,
  disabled,
  left,
  title,
  openKeys,
  setOpenKeys,
  id,
  level,
  children,
}: PropsWithChildren<
  Omit<MenuItemProps, 'activeColor' | 'activeTextColor' | 'items'> & {
    openKeys: string[];
    setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>;
    level: number;
  }
>) => {
  const theme = useTheme<Theme>();
  const { bodyStyle, progress, handleLayout, handlePress } = useGroup({ openKeys, setOpenKeys, id });

  return (
    <Box backgroundColor={'gray50'}>
      <Pressable
        activeOpacity={activeOpacity}
        onPress={handlePress}
        disabled={disabled}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.spacing.x2,
          paddingHorizontal: theme.spacing.x2,
          borderBottomWidth: ONE_PIXEL,
          borderColor: theme.colors.border,
        }}
      >
        <Box>{left}</Box>
        <Box flex={1} style={{ paddingLeft: level * theme.spacing.x2 }}>
          <Text variant="p0" color="text">
            {title}
          </Text>
        </Box>
        <Chevron {...{ progress }} />
      </Pressable>
      <Animated.View style={[{ position: 'relative', overflow: 'hidden' }, bodyStyle]}>
        <Box position={'absolute'} width="100%" collapsable={false} onLayout={handleLayout}>
          {children}
        </Box>
      </Animated.View>
    </Box>
  );
};
MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
