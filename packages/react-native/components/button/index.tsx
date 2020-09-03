import React, { FC } from 'react';
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import {
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  useRestyle,
} from '@shopify/restyle';
import Text from '../text';
import { Theme } from '../config/theme';

const restyleFunctions = [spacing, border, backgroundColor];

type ButtonProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  TouchableOpacityProps & {
    label: string;
  };

const Button: FC<ButtonProps> = ({ onPress, label, activeOpacity = 0.3, ...restProps }) => {
  const props = useRestyle(restyleFunctions, restProps);

  return (
    <TouchableOpacity {...{ onPress, activeOpacity }}>
      <View {...props}>
        <Text variant="buttonLabel">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
