import React, { FC } from 'react';

import { Box, Flex, helpers, Modal, NumberKeyboard, Text, Theme, useTheme, WhiteSpace } from '@td-design/react-native';

import usePasswordModal from './usePasswordModal';

const { NumberKeyboardView } = NumberKeyboard;
const { ONE_PIXEL } = helpers;

export interface PasswordModalProps {
  /** 提交事件 */
  onDone?: (password: string) => void;
  /** 密码长度 */
  length?: number;
  /** 密码框标题 */
  title?: string;
  /** 是否显示光标 */
  showCursor?: boolean;
  /** 按下时的不透明度 */
  activeOpacity?: number;
}
const PasswordModal: FC<PasswordModalProps> = ({
  length = 6,
  activeOpacity = 0.6,
  onDone,
  title,
  showCursor = false,
}) => {
  const theme = useTheme<Theme>();
  const { password, visible, setFalse, itemWidth, handleLayout, combineText, handleSubmit, handleDelete } =
    usePasswordModal({
      length,
      onDone,
    });

  /** 密码框的render */
  const passwordItems: React.ReactNode[] = [...Array(length)].map((_, i) => {
    let borderRightWidth = ONE_PIXEL;
    if (i === length - 1) {
      borderRightWidth = 0;
    }
    return (
      <Box
        key={i}
        width={itemWidth}
        height={itemWidth}
        justifyContent="center"
        alignItems="center"
        borderRightWidth={borderRightWidth}
        borderColor="border"
      >
        {password.length === i && visible && showCursor ? (
          <Box width={1} height={itemWidth / 3} backgroundColor={'primary200'} />
        ) : (
          <Box
            width={theme.spacing.x3}
            height={theme.spacing.x3}
            borderRadius="x3"
            backgroundColor="gray500"
            opacity={password.length > i ? 1 : 0}
          />
        )}
      </Box>
    );
  });

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
      <Box>
        {!!title && (
          <>
            <WhiteSpace />
            <Text variant="p0" color="text" textAlign="center">
              {title}
            </Text>
          </>
        )}
        <WhiteSpace />
        <Flex
          marginHorizontal="x2"
          borderWidth={ONE_PIXEL}
          borderColor="border"
          borderRadius="x1"
          onLayout={handleLayout}
        >
          {passwordItems}
        </Flex>
      </Box>
      <WhiteSpace />
      <NumberKeyboardView
        onPress={combineText}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
        type="integer"
        activeOpacity={activeOpacity}
      />
    </Modal>
  );
};

export default PasswordModal;
