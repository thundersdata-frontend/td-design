import React, { FC } from 'react';

import { Box, Flex, helpers, Modal, NumberKeyboard, Text, WhiteSpace, WingBlank } from '@td-design/react-native';

import usePasswordModal from './usePasswordModal';

const { NumberKeyboardView } = NumberKeyboard;
const { px, ONE_PIXEL } = helpers;

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
  activeOpacity = 0.5,
  onDone,
  title,
  showCursor = false,
}) => {
  const { password, visible, setFalse, combineText, handleSubmit, handleDelete } = usePasswordModal({
    length,
    onDone,
  });

  /** 密码框的render */
  const passwordItems: React.ReactNode[] = [...Array(length)].map((_, i) => {
    let borderRightWidth = px(1);
    if (i === length - 1) {
      borderRightWidth = 0;
    }
    return (
      <Box
        key={i}
        flex={1}
        height={px(48)}
        justifyContent="center"
        alignItems="center"
        borderRightWidth={borderRightWidth}
        borderColor="border"
      >
        {password.length === i && visible && showCursor ? (
          <Box>
            <Text variant="p0" color="primary200">
              |
            </Text>
          </Box>
        ) : (
          <Box
            width={px(12)}
            height={px(12)}
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
      <Box style={{ height: px(115) }}>
        {!!title && (
          <>
            <WhiteSpace />
            <Text variant="p0" color="gray500" textAlign="center">
              {title}
            </Text>
          </>
        )}
        <WingBlank>
          <WhiteSpace />
          <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1">
            {passwordItems}
          </Flex>
        </WingBlank>
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
