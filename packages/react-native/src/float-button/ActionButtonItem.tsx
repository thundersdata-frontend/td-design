import React, { FC, memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import { ActionButtonItemProps, TitleProps } from './type';

const { deviceWidth, ONE_PIXEL } = helpers;

const justifyContentMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const ActionButtonItem: FC<ActionButtonItemProps> = props => {
  const theme = useTheme<Theme>();
  const {
    progress,
    title,
    textStyle,
    textContainerStyle,
    spaceBetween = theme.spacing.x1,
    size,
    position = 'left',
    spacing,
    backgroundColor,
    onPress,
    activeOpacity,
    icon,
  } = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: justifyContentMap[position] as any,
      alignItems: 'center',
    },
    button: {
      borderRadius: size!,
      backgroundColor,
    },
  });

  const style = useAnimatedStyle(() => ({
    height: mix(progress!.value, 0, size! + spacing!),
    opacity: mix(progress!.value, 0, 1),
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      {position === 'right' && (
        <Title
          {...{
            title,
            textStyle,
            textContainerStyle,
            spaceBetween,
            size,
            position,
          }}
        />
      )}
      <Pressable activeOpacity={activeOpacity} onPress={onPress}>
        <Box justifyContent={'center'} alignItems={'center'} width={size} height={size} style={styles.button}>
          {icon}
        </Box>
      </Pressable>
      {position !== 'right' && (
        <Title
          {...{
            title,
            textStyle,
            textContainerStyle,
            spaceBetween,
            size,
            position,
          }}
        />
      )}
    </Animated.View>
  );
};

const getPosition = (position: 'left' | 'center' | 'right', size: number, spaceBetween: number) => {
  const style: StyleProp<ViewStyle> = {};
  if (position === 'right') {
    style.right = size + spaceBetween;
  } else if (position === 'center') {
    style.left = deviceWidth / 2 + size / 3 + spaceBetween;
  } else {
    style.left = size + spaceBetween;
  }
  return style;
};

const Title: FC<TitleProps> = ({ title, textStyle, textContainerStyle, spaceBetween, size, position = 'left' }) => {
  if (!title) return null;

  const renderTitle = () => {
    if (React.isValidElement(title)) return title;
    return (
      <Text variant={'p1'} color="gray500" style={textStyle} numberOfLines={1}>
        {title}
      </Text>
    );
  };

  return (
    <Box
      position="absolute"
      padding="x1"
      borderRadius={'x1'}
      borderWidth={ONE_PIXEL}
      borderColor={'border'}
      backgroundColor={'white'}
      style={[getPosition(position, size!, spaceBetween), textContainerStyle]}
    >
      {renderTitle()}
    </Box>
  );
};
ActionButtonItem.displayName = 'ActionButtonItem';

export default memo(ActionButtonItem);
