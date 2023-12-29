import { InputProps } from '../input';
import { InputItemProps } from '../input/InputItem';

export interface SmsProps {
  /** 倒计时文字，默认为 获取验证码 */
  sendText?: string;
  /** 重新发送文字，默认为：重新发送 */
  resendText?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 发送验证码之前的回调，通常用于判断手机号是否有值 */
  onBefore?: () => Promise<boolean>;
  /** 发送验证码 */
  onSend: () => void;
  /** 倒计时结束后的回调 */
  onEnd?: () => void;
  /** 验证码样式是否有边框 */
  codeType?: 'normal' | 'border';
  /** 按下时的不透明度 */
  activeOpacity?: number;
}
export interface CountDownItemProps extends InputItemProps, SmsProps {}

export interface CountDownProps extends InputProps, SmsProps {}
