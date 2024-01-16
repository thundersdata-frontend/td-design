import React, { FC } from 'react';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Modal from '../modal';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardModalProps } from './type';
import useVehicleKeyboardViewModal from './useVehicleKeyboardModal';
import VehicleKeyboardView from './VehicleKeyboardView';

const { ONE_PIXEL, deviceWidth } = helpers;
const VehicleKeyboardModal: FC<
  VehicleKeyboardModalProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({ value = '', onPress, onDelete, onSubmit, submitText = '完成', activeOpacity, onAnimationEnd }) => {
  const theme = useTheme<Theme>();
  const { type, textArr, visible, setFalse, handleChange, handleSubmit, handleDelete } = useVehicleKeyboardViewModal({
    value,
    onPress,
    onDelete,
    onSubmit,
  });

  const itemWidth = (deviceWidth - theme.spacing.x2 * 2 - theme.spacing.x1 * 7) / 9;

  const InputText = (value: string | undefined, index: number) => {
    if (index === 7 && !value) {
      return (
        <Text variant="p3" color="text">
          新能源
        </Text>
      );
    }
    return (
      <Text variant="p1" color="text">
        {value}
      </Text>
    );
  };

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse} onAnimationEnd={onAnimationEnd}>
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingVertical={'x2'}
        marginBottom={'x1'}
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor={'border'}
      >
        <Flex justifyContent="center" width={itemWidth * 8} borderWidth={ONE_PIXEL} borderColor={'border'}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <Box
                key={item}
                alignItems="center"
                justifyContent="center"
                borderRightWidth={index === 7 ? 0 : ONE_PIXEL}
                borderColor="border"
                width={itemWidth}
                height={itemWidth}
              >
                {InputText(textArr[item], item)}
              </Box>
            );
          })}
        </Flex>
        <Pressable onPress={handleSubmit} activeOpacity={activeOpacity} style={{ paddingLeft: theme.spacing.x6 }}>
          <Text variant="p0" color="primary200">
            {submitText}
          </Text>
        </Pressable>
      </Flex>
      <VehicleKeyboardView type={type} onPress={handleChange} onDelete={handleDelete} activeOpacity={activeOpacity} />
    </Modal>
  );
};
VehicleKeyboardModal.displayName = 'VehicleKeyboardModal';

export default VehicleKeyboardModal;
