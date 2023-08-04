import { LayoutChangeEvent } from 'react-native';

import { helpers } from '@td-design/react-native';
import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

const { deviceWidth } = helpers;
export interface PasswordProps {
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
  /** 按下时的不透明度 */
  activeOpacity?: number;
}

export default function usePassword({
  clean = true,
  length = 6,
  onDone,
  onChange,
}: Pick<PasswordProps, 'clean' | 'length' | 'onDone' | 'onChange'>) {
  const [password, setPassword] = useSafeState('');
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const [width, setWidth] = useSafeState(deviceWidth);

  const handleLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const itemWidth = Math.floor(width / length);

  /** 显示键盘 */
  const show = () => {
    if (clean) {
      setPassword('');
    }
    setTrue();
  };

  /** 隐藏键盘 */
  const hide = () => {
    setFalse();
  };

  /** 键盘删除事件 */
  const handleDelete = () => {
    const nextPassword = password.substring(0, password.length - 1);
    setPassword(nextPassword);
    onChange?.(nextPassword);
  };

  /** 按键 */
  const combineText = (text: string | number) => {
    const nextPassword = password + text;
    if (nextPassword.length <= length) {
      setPassword(nextPassword);
      onChange?.(nextPassword);
      if (nextPassword.length === length) {
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

  return {
    password,
    show,
    clear,
    hide,
    visible,
    itemWidth,
    handleLayout: useMemoizedFn(handleLayout),
    setFalse: useMemoizedFn(setFalse),
    combineText: useMemoizedFn(combineText),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
