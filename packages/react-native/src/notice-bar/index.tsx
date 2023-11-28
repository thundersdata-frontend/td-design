import React, { FC, PropsWithChildren } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, { FadeOutRight } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import AnimatedNotice from './AnimatedNotice';
import { NoticeBarProps } from './type';

const DEFAULT_DURATION = 5000;

const NoticeBar: FC<NoticeBarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon = <SvgIcon name="bells" color={theme.colors.func500} />,
    mode = '',
    text = '',
    textColor = 'text',
    onPress,
    duration = DEFAULT_DURATION,
    animated = false,
    style,
    activeOpacity = 0.6,
  } = props;

  const [visible, setVisible] = useSafeState(true);
  const [height, setHeight] = useSafeState(0);

  const handleContentLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  if (!visible) return null;

  const BaseContent = (
    <AnimatedNotice {...{ text, textColor, icon, duration, animated, height, onContentLayout: handleContentLayout }} />
  );

  switch (mode) {
    case 'close':
      return (
        <WrapComp {...{ onPress, activeOpacity }}>
          <Animated.View
            exiting={FadeOutRight}
            style={[
              {
                position: 'relative',
                backgroundColor: theme.colors.func100,
                paddingVertical: theme.spacing.x2,
              },
              style,
            ]}
          >
            {BaseContent}
            <Pressable
              activeOpacity={1}
              onPress={() => setVisible(false)}
              style={{
                height,
                paddingHorizontal: theme.spacing.x1,
                position: 'absolute',
                zIndex: 99,
                right: 0,
                top: theme.spacing.x2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.func100,
              }}
            >
              <SvgIcon name="close" color={theme.colors.func500} />
            </Pressable>
          </Animated.View>
        </WrapComp>
      );

    case 'link':
      return (
        <WrapComp {...{ onPress, activeOpacity }}>
          <Flex backgroundColor="func100" paddingVertical={'x2'} style={style} position={'relative'} overflow="hidden">
            {BaseContent}
            <Box
              position={'absolute'}
              right={0}
              top={theme.spacing.x2}
              height={height}
              zIndex="99"
              paddingHorizontal="x1"
              justifyContent="center"
              alignItems={'center'}
              backgroundColor="func100"
            >
              <SvgIcon name="right" color={theme.colors.func500} />
            </Box>
          </Flex>
        </WrapComp>
      );

    default:
      return (
        <WrapComp {...{ onPress, activeOpacity }}>
          <Box backgroundColor="func100" paddingVertical={'x2'} style={style} overflow="hidden">
            {BaseContent}
          </Box>
        </WrapComp>
      );
  }
};
NoticeBar.displayName = 'NoticeBar';

export default NoticeBar;

const WrapComp = ({
  children,
  onPress,
  activeOpacity,
}: PropsWithChildren<Pick<NoticeBarProps, 'activeOpacity' | 'onPress'>>) => {
  if (onPress)
    return (
      <Pressable activeOpacity={activeOpacity} onPress={onPress}>
        {children}
      </Pressable>
    );
  return <>{children}</>;
};
