import React, { FC } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Flex from '../flex';
import helpers from '../helpers';
import Modal from '../modal';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardModalProps } from './type';
import useVehicleKeyboardViewModal from './useVehicleKeyboardModal';
import VehicleKeyboardView from './VehicleKeyboardView';

const { px } = helpers;
const SIZE = px(48);
const VehicleKeyboardModal: FC<VehicleKeyboardModalProps> = ({
  value = '',
  onPress,
  onDelete,
  onSubmit,
  visible,
  onClose,
}) => {
  const theme = useTheme<Theme>();
  const { type, text, handleChange, handleSubmit, handleDelete } = useVehicleKeyboardViewModal({
    value,
    onPress,
    onDelete,
    onSubmit,
  });

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={onClose}>
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="center"
        height={SIZE}
        paddingHorizontal="x4"
      >
        <TouchableOpacity
          style={{
            width: SIZE,
            height: SIZE,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text variant="d2" color="gray500">
            完成
          </Text>
        </TouchableOpacity>
        <Text
          variant="d2"
          color="gray500"
          selectable
          // @ts-ignore
          userSelect="all"
        >
          车牌号：{text}
        </Text>
        <TouchableOpacity
          style={{
            width: SIZE,
            height: SIZE,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
        >
          <SvgIcon name="down" size={px(20)} color={theme.colors.gray500} />
        </TouchableOpacity>
      </Flex>
      <VehicleKeyboardView type={type} onPress={handleChange} onDelete={handleDelete} />
    </Modal>
  );
};
VehicleKeyboardModal.displayName = 'VehicleKeyboardModal';

export default VehicleKeyboardModal;
