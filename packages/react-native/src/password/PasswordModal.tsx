import React, { FC, useState } from 'react';
import { Text } from 'react-native';
import Box from '../box';
import Modal from '../modal';
import Flex from '../flex';
import NumberKeyboard from '../number-keyboard';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import WhiteSpace from '../white-space';
import WingBlank from '../wing-blank';

export interface PasswordModalProps {
  /** 提交事件 */
  onDone?: (password: string) => void;
  /** 密码长度 */
  length?: number;
  /** 密码框标题 */
  title?: string;
}
const PasswordModal: FC<PasswordModalProps & { afterClose: () => void }> = ({
  length = 6,
  onDone,
  title,
  afterClose,
}) => {
  const theme = useTheme<Theme>();
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  /** modal隐藏 */
  const hide = () => {
    setVisible(false);
  };

  /** 键盘删除事件 */
  const onDelete = () => {
    const nextPassword = password.substring(0, password.length - 1);
    setPassword(nextPassword);
  };
  /** 按键 */
  const combineText = (text: string | number) => {
    const len = length;

    const nextPassword = password + text;
    if (nextPassword.length <= len) {
      setPassword(nextPassword);
      if (nextPassword.length === len) {
        onDone?.(nextPassword);
        hide();
      }
    }
  };
  /** 键盘提交事件 */
  const handleSubmit = () => {
    onDone?.(password);
    hide();
  };
  /** 密码框的render */
  const passwordItems: React.ReactNode[] = [];
  for (let i = 0; i < length; i++) {
    let borderRightWidth = px(1);
    if (i === length - 1) {
      borderRightWidth = 0;
    }
    passwordItems.push(
      <Box
        key={i}
        flex={1}
        height={px(48)}
        justifyContent="center"
        alignItems="center"
        borderRightWidth={borderRightWidth}
        borderColor="borderColor"
      >
        <Box
          width={px(10)}
          height={px(10)}
          borderRadius="roundedButton"
          backgroundColor="primaryTextColor"
          opacity={password.length > i ? 1 : 0}
        />
      </Box>
    );
  }

  return (
    <Modal
      visible={visible}
      maskClosable={true}
      position="bottom"
      onClose={() => setVisible(false)}
      afterClose={afterClose}
    >
      {title && (
        <>
          <WhiteSpace />
          <Text style={[theme.textVariants.secondaryBody, { textAlign: 'center' }]}>{title}</Text>
        </>
      )}
      <WingBlank>
        <Flex borderWidth={px(1)} borderColor="borderColor" marginVertical="l" borderRadius="defaultButton">
          {passwordItems}
        </Flex>
      </WingBlank>
      <WhiteSpace />
      <NumberKeyboard onPress={combineText} onDelete={onDelete} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default PasswordModal;
