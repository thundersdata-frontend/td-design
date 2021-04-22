import React, { useState, forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import PasswordModal, { PasswordModalProps } from './PasswordModal';
import {
  helpers,
  Modal,
  Icon,
  Portal,
  Flex,
  Box,
  NumberKeyboard,
  Text,
  Theme,
  useTheme,
} from '@td-design/react-native';

const { px } = helpers;
interface PasswordProps {
  /** 密码框长度 */
  length?: number;
  /** 完成事件 */
  onDone?: (password: string) => void;
  /** 是否清除 */
  clean?: boolean;
  /** 密码改变 */
  onChange?: (password: string) => void;
  /** 是否显示光标 */
  showCursor?: boolean;
}

export interface PasswordInputRef {
  show: () => void;
  hide: () => void;
  clear: () => void;
}

const Password = forwardRef<PasswordInputRef, PasswordProps>(
  ({ length = 6, onDone, clean = true, onChange, showCursor = false }, ref) => {
    const theme = useTheme<Theme>();
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    /** 显示键盘 */
    const show = () => {
      if (clean) {
        setPassword('');
      }
      setVisible(true);
    };

    /** 隐藏键盘 */
    const hide = () => {
      setVisible(false);
    };

    /** 键盘删除事件 */
    const handleDelete = () => {
      const nextPassword = password.substring(0, password.length - 1);
      setPassword(nextPassword);
      onChange?.(nextPassword);
    };

    /** 按键 */
    const combineText = (text: string | number) => {
      const len = length;
      const nextPassword = password + text;
      if (nextPassword.length <= len) {
        setPassword(nextPassword);
        onChange?.(nextPassword);
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

    /** 清除密码 */
    const clear = () => {
      setPassword('');
    };
    React.useImperativeHandle(ref, () => {
      return {
        show: show,
        hide: hide,
        clear: clear,
      };
    });

    const cursor = () => {
      return (
        <Box>
          <Text variant="hint2">|</Text>
        </Box>
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
          borderColor="password_border"
        >
          {password.length === i && visible && showCursor ? (
            cursor()
          ) : (
            <Box
              width={px(10)}
              height={px(10)}
              borderRadius="base"
              backgroundColor="password_dot"
              opacity={password.length > i ? 1 : 0}
            />
          )}
        </Box>
      );
    });

    return (
      <Box>
        <TouchableOpacity onPress={show} activeOpacity={0.8}>
          <Flex borderWidth={px(1)} borderColor="password_border" borderRadius="base">
            {passwordItems}
          </Flex>
        </TouchableOpacity>
        <Modal visible={visible} maskClosable={true} position="bottom" onClose={() => setVisible(false)}>
          <Flex justifyContent="center" alignItems="center" height={px(48)}>
            <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={0.8}>
              <Icon name="chevron-thin-down" type="entypo" size={px(24)} color={theme.colors.password_icon} />
            </TouchableOpacity>
          </Flex>
          <NumberKeyboard onPress={combineText} onDelete={handleDelete} onSubmit={handleSubmit} type="integer" />
        </Modal>
      </Box>
    );
  }
);

function modal(props: PasswordModalProps) {
  const key = Portal.add(<PasswordModal {...props} afterClose={() => Portal.remove(key)} />);
  return key;
}

export default Object.assign(Password, {
  modal,
});
