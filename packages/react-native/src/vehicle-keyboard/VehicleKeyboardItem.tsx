import React, { forwardRef } from 'react';
import { Keyboard } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardItemProps, VehicleKeyboardRef } from './type';
import useVehicleKeyboard from './useVehicleKeyboard';
import VehicleKeyboardModal from './VehicleKeyboardModal';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(Pressable);
const VehicleKeyboardItem = forwardRef<VehicleKeyboardRef, VehicleKeyboardItemProps>(
  (
    {
      value,
      onChange,
      onCheck,
      placeholder = '请输入',
      disabled = false,
      style,
      inputStyle,
      extra,
      allowClear = true,
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, currentText, handleSubmit, handleInputClear } = useVehicleKeyboard({
      value,
      onChange,
      onCheck,
      placeholder,
      ref,
    });

    return (
      <Box width="100%">
        <Flex style={style}>
          <Pressable
            activeOpacity={activeOpacity}
            onPress={() => {
              Keyboard.dismiss();
              if (disabled) return;
              setTrue();
            }}
            style={[
              {
                flexGrow: 1,
                paddingVertical: theme.spacing.x2,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              variant="p1"
              color={currentText === placeholder ? 'gray300' : 'text'}
              style={[{ textAlign: 'right' }, inputStyle]}
              selectable
            >
              {currentText}
            </Text>
          </Pressable>
          {allowClear && !disabled && !!currentText && currentText !== placeholder && (
            <AnimatedTouchableIcon
              entering={FadeInRight}
              exiting={FadeOutRight}
              activeOpacity={1}
              onPress={handleInputClear}
              style={{ alignItems: 'center' }}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          {!!extra && <Box>{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
        </Flex>
        <VehicleKeyboardModal
          {...restProps}
          value={currentText === placeholder ? '' : currentText}
          visible={visible}
          onClose={setFalse}
          onSubmit={handleSubmit}
          activeOpacity={activeOpacity}
        />
      </Box>
    );
  }
);
VehicleKeyboardItem.displayName = 'VehicleKeyboardItem';

export default VehicleKeyboardItem;
