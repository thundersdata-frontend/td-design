import React, { forwardRef } from 'react';
import { Keyboard } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardInputProps, VehicleKeyboardRef } from './type';
import useVehicleKeyboard from './useVehicleKeyboard';
import VehicleKeyboardModal from './VehicleKeyboardModal';

const { ONE_PIXEL } = helpers;
const VehicleKeyboardInput = forwardRef<VehicleKeyboardRef, VehicleKeyboardInputProps>(
  (
    {
      label,
      value,
      onChange,
      onCheck,
      placeholder = '请输入',
      disabled = false,
      type,
      extra,
      style,
      inputStyle,
      allowClear = true,
      brief,
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, currentText, handleSubmit, handleInputClear } = useVehicleKeyboard({
      value,
      onCheck,
      onChange,
      placeholder,
      ref,
    });

    return (
      <Box>
        <Flex marginRight="x2" marginBottom="x1" alignItems="center">
          <Text variant="p1" color="text">
            {label}
          </Text>
        </Flex>
        <Flex paddingHorizontal="x1" borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1" style={style}>
          <Pressable
            activeOpacity={activeOpacity}
            onPress={() => {
              Keyboard.dismiss();
              setTrue();
            }}
            style={[
              {
                flex: 1,
                paddingVertical: theme.spacing.x2,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              variant="p1"
              color={currentText === placeholder ? 'gray300' : 'text'}
              paddingLeft="x1"
              style={[{ textAlign: 'right' }, inputStyle]}
              selectable
            >
              {currentText}
            </Text>
          </Pressable>
          {allowClear && !disabled && !!currentText && currentText !== placeholder && (
            <Pressable activeOpacity={1} onPress={handleInputClear} style={{ alignItems: 'center' }}>
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </Pressable>
          )}
          {!!extra && (
            <Box>
              {typeof extra === 'string' ? (
                <Text variant={'p2'} color="text">
                  {extra}
                </Text>
              ) : (
                extra
              )}
            </Box>
          )}
        </Flex>
        {!!brief && (
          <Box marginBottom="x1">
            {typeof brief === 'string' ? (
              <Text variant="p2" color="text">
                {brief}
              </Text>
            ) : (
              brief
            )}
          </Box>
        )}
        <VehicleKeyboardModal
          {...restProps}
          type={type}
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
VehicleKeyboardInput.displayName = 'VehicleKeyboardInput';

export default VehicleKeyboardInput;
