import React, { FC, useState } from 'react';
import { useLoop } from 'react-native-redash';
import Animated from 'react-native-reanimated';
import { px } from '../helper';
import Box from '../box';
import Modal from '../modal/Modal';
import Flex from '../flex';
import NumberKeyboard from '../number-keyboard';
import WhiteSpace from '../white-space';
import WingBlank from '../wing-blank';
import Text from '../text';

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
const PasswordModal: FC<PasswordModalProps & { afterClose: () => void }> = ({
  length = 6,
  onDone,
  title,
  afterClose,
  showCursor = false,
}) => {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const flashAnimated = useLoop(1000, true);

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

  const cursor = () => {
    return (
      <Animated.View style={{ opacity: flashAnimated }}>
        <Text>|</Text>
      </Animated.View>
    );
  };

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
        borderColor="borderColor"
      >
        {password.length === i && visible && showCursor ? (
          cursor()
        ) : (
          <Box
            width={px(10)}
            height={px(10)}
            borderRadius="base"
            backgroundColor="primaryTextColor"
            opacity={password.length > i ? 1 : 0}
          />
        )}
      </Box>
    );
  });

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
          <Text variant="secondaryBody" textAlign="center">
            {title}
          </Text>
        </>
      )}
      <WingBlank>
        <Flex borderWidth={px(1)} borderColor="borderColor" marginVertical="l" borderRadius="base">
          {passwordItems}
        </Flex>
      </WingBlank>
      <WhiteSpace />
      <NumberKeyboard onPress={combineText} onDelete={onDelete} onSubmit={handleSubmit} type="integer" />
    </Modal>
  );
};

export default PasswordModal;
