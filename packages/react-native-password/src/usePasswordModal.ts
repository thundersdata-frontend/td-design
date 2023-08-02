import { LayoutChangeEvent } from 'react-native';

import { helpers } from '@td-design/react-native';
import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { PasswordModalProps } from './PasswordModal';

const { deviceWidth } = helpers;

export default function usePasswordModal({ length = 6, onDone }: Pick<PasswordModalProps, 'length' | 'onDone'>) {
  const [password, setPassword] = useSafeState('');
  const [visible, { setFalse }] = useBoolean(true);

  const [width, setWidth] = useSafeState(deviceWidth);

  const handleLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const itemWidth = Math.floor(width / length);

  /** 键盘删除事件 */
  const handleDelete = () => {
    const nextPassword = password.substring(0, password.length - 1);
    setPassword(nextPassword);
  };
  /** 按键 */
  const combineText = (text: string | number) => {
    const nextPassword = password + text;
    if (nextPassword.length <= length) {
      setPassword(nextPassword);
      if (nextPassword.length === length) {
        onDone?.(nextPassword);
        setFalse();
      }
    }
  };
  /** 键盘提交事件 */
  const handleSubmit = () => {
    onDone?.(password);
    setFalse();
  };

  return {
    password,
    visible,
    itemWidth,
    handleLayout: useMemoizedFn(handleLayout),
    setFalse: useMemoizedFn(setFalse),
    combineText: useMemoizedFn(combineText),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
