import { Box, Flex, helpers, Modal, NumberKeyboard, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import React, { FC } from 'react';

import usePasswordModal from './usePasswordModal';

const { NumberKeyboardView } = NumberKeyboard;
const { px } = helpers;

export interface PasswordModalProps {
  /** 提交事件 */
  onDone?: (password: string) => void;
  /** 密码长度 */
  length?: number;
  /** 密码框标题 */
  title?: string;
  /** 是否显示光标 */
  showCursor?: boolean;
}
const PasswordModal: FC<PasswordModalProps> = ({ length = 6, onDone, title, showCursor = false }) => {
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
            width={px(8)}
            height={px(8)}
            borderRadius="x1"
            backgroundColor="primary_text"
            opacity={password.length > i ? 1 : 0}
          />
        )}
      </Box>
    );
  });

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
      <Box style={{ height: px(115) }}>
        {title && (
          <>
            <WhiteSpace />
            <Text variant="p0" color="white" textAlign="center">
              {title}
            </Text>
          </>
        )}
        <WingBlank>
          <Flex borderWidth={px(1)} borderColor="border" marginVertical="x4" borderRadius="x1">
            {passwordItems}
          </Flex>
        </WingBlank>
      </Box>

      <WhiteSpace />
      <NumberKeyboardView onPress={combineText} onDelete={handleDelete} onSubmit={handleSubmit} type="integer" />
    </Modal>
  );
};

export default PasswordModal;
