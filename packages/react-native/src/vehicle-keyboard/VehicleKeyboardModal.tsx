import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Modal from '../modal';
import Text from '../text';
import { VehicleKeyboardModalProps } from './type';
import useVehicleKeyboardViewModal from './useVehicleKeyboardModal';
import VehicleKeyboardView from './VehicleKeyboardView';

const { px, ONE_PIXEL } = helpers;
const SIZE = px(48);
const VehicleKeyboardModal: FC<VehicleKeyboardModalProps> = ({
  value = '',
  onPress,
  onDelete,
  onSubmit,
  visible,
  onClose,
}) => {
  const { type, textArr, handleChange, handleSubmit, handleDelete } = useVehicleKeyboardViewModal({
    value,
    onPress,
    onDelete,
    onSubmit,
  });

  const InputText = (value: string | undefined, index: number) => {
    if (index === 7 && !value) {
      return (
        <Text variant="d2" color="gray50">
          新能源
        </Text>
      );
    }
    return (
      <Text variant="d2" color="gray500">
        {value}
      </Text>
    );
  };

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={onClose}>
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="center"
        height={SIZE}
        paddingHorizontal="x4"
      >
        <Flex justifyContent="center" flex={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
            return (
              <Box
                key={item}
                borderColor="border"
                height={px(38)}
                alignItems="center"
                justifyContent="center"
                width={px(38)}
                borderWidth={ONE_PIXEL}
              >
                {InputText(textArr[item], item)}
              </Box>
            );
          })}
        </Flex>
        <TouchableOpacity
          style={{
            width: px(30),
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
      </Flex>
      <VehicleKeyboardView type={type} onPress={handleChange} onDelete={handleDelete} />
    </Modal>
  );
};
VehicleKeyboardModal.displayName = 'VehicleKeyboardModal';

export default VehicleKeyboardModal;
