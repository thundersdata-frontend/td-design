import React, { FC, memo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import { ActionButtonItemProps, TitleProps } from './type';

const { px, deviceWidth, ONE_PIXEL } = helpers;

const justifyContentMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const ActionButtonItem: FC<ActionButtonItemProps> = ({
  progress,
  title,
  textStyle,
  textContainerStyle,
  spaceBetween = px(15),
  size = px(50),
  position = 'left',
  verticalOrientation,
  spacing = px(20),
  buttonColor,
  parentSize = px(50),
  onPress,
  activeOpacity = 0.5,
  children,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: justifyContentMap[position] as any,
      alignItems: 'center',
    },
    button: {
      borderRadius: size / 2,
      backgroundColor: buttonColor,
    },
    position: {
      [position]: (parentSize - size) / 2,
    },
  });

  const style = useAnimatedStyle(() => ({
    height: mix(progress!.value, 0, size + spacing),
    opacity: mix(progress!.value, 0, 1),
    transform: [
      {
        translateY: mix(progress!.value, verticalOrientation === 'down' ? -40 : 40, 0),
      },
    ],
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
            parentSize,
            position,
            onPress,
            activeOpacity,
          }}
        />
      )}
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          width={size}
          height={size}
          style={StyleSheet.flatten([styles.button, position !== 'center' && (styles.position as ViewStyle)])}
        >
          {children}
        </Box>
      </TouchableOpacity>
      {position !== 'right' && (
        <Title
          {...{
            title,
            textStyle,
            textContainerStyle,
            spaceBetween,
            size,
            parentSize,
            position,
            onPress,
            activeOpacity,
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
    style.left = deviceWidth / 2 + size / 3;
  } else {
    style.left = size + spaceBetween;
  }
  return style;
};

const Title: FC<TitleProps> = ({
  title,
  textStyle,
  textContainerStyle,
  spaceBetween,
  size,
  position = 'left',
  onPress,
  activeOpacity,
}) => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    textContainer: {
      position: 'absolute',
      padding: px(4),
      borderRadius: px(4),
      borderWidth: ONE_PIXEL,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    text: {
      flex: 1,
      fontSize: px(14),
      color: theme.colors.gray500,
    },
  });

  if (!title) return null;

  const renderTitle = () => {
    if (React.isValidElement(title)) return title;
    return (
      <Text allowFontScaling={false} style={StyleSheet.flatten([styles.text, textStyle])} numberOfLines={1}>
        {title}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={StyleSheet.flatten([styles.textContainer, getPosition(position, size, spaceBetween), textContainerStyle])}
    >
      {renderTitle()}
    </TouchableOpacity>
  );
};
ActionButtonItem.displayName = 'ActionButtonItem';

export default memo(ActionButtonItem);
