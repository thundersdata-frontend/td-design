import React, { FC, useState } from 'react';
import { useClock, useValue } from 'react-native-redash';
import Animated, {
  Easing,
  useCode,
  block,
  timing,
  cond,
  set,
  clockRunning,
  not,
  startClock,
  stopClock,
} from 'react-native-reanimated';
import { px } from '../helper';
import Box from '../box';
import Modal from '../modal';
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
  const clock = useClock();
  const flashAnimated = useValue(0);

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

  const state = {
    finished: useValue(0),
    position: useValue(0),
    time: useValue(0),
    frameTime: useValue(0),
  };
  const config = {
    toValue: flashAnimated,
    duration: 500,
    easing: Easing.inOut(Easing.ease),
  };

  useCode(
    () =>
      block([
        cond(
          not(!visible && !showCursor),
          block([
            cond(not(clockRunning(clock)), startClock(clock)),
            timing(clock, state, config),
            cond(state.finished, [
              set(state.finished, 0),
              set(state.time, 0),
              set(state.frameTime, 0),
              set(config.toValue, cond(config.toValue, 0, 1)),
            ]),
          ]),
          stopClock(clock)
        ),
      ]),
    [visible, showCursor]
  );

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
