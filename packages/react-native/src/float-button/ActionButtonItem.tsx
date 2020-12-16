import React, { FC } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Text from '../text';
import { px, deviceWidth, ONE_PIXEL } from '../helper';
import { Theme } from '../config/theme';
import { ActionButtonItemProps, TitleProps } from './type';

const justifyContentMap: { [key: string]: 'flex-start' | 'flex-end' | 'center' } = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const ActionButtonItem: FC<ActionButtonItemProps> = ({
  animation,
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
  children,
}) => {
  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: buttonColor,
  };
  if (position !== 'center') {
    buttonStyle[position] = (parentSize - size) / 2;
  }

  return (
    <Animated.View
      style={{
        height: interpolate(animation!, {
          inputRange: [0, 1],
          outputRange: [0, size + spacing],
        }),
        opacity: interpolate(animation!, {
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        flexDirection: 'row',
        justifyContent: justifyContentMap[position],
        alignItems: 'center',
        transform: [
          {
            translateY: interpolate(animation!, {
              inputRange: [0, 1],
              outputRange: [verticalOrientation === 'down' ? -40 : 40, 0],
            }),
          },
        ],
      }}
    >
      {position === 'right' && (
        <Title {...{ title, textStyle, textContainerStyle, spaceBetween, size, parentSize, position, onPress }} />
      )}
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Box style={buttonStyle}>{children}</Box>
      </TouchableOpacity>
      {position !== 'right' && (
        <Title {...{ title, textStyle, textContainerStyle, spaceBetween, size, parentSize, position, onPress }} />
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
}) => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    textContainer: {
      position: 'absolute',
      padding: px(4),
      borderRadius: px(4),
      borderWidth: ONE_PIXEL,
      borderColor: theme.colors.borderColor,
      backgroundColor: theme.colors.white,
    },
    text: {
      flex: 1,
      fontSize: px(14),
      color: theme.colors.closedBgColor,
    },
  });

  if (!title) return null;

  const textStyles = [styles.textContainer, getPosition(position, size, spaceBetween), textContainerStyle];

  const titleComp = React.isValidElement(title) ? (
    title
  ) : (
    <Text allowFontScaling={false} style={[styles.text, textStyle]} numberOfLines={1}>
      {title}
    </Text>
  );

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={textStyles}>
      {titleComp}
    </TouchableOpacity>
  );
};

export default ActionButtonItem;
