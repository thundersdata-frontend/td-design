import helpers from '../../helpers';
import { AvatarProps } from '../type';

const { px } = helpers;
export default function useAvatar({ size = px(46), borderRadius = 0, circular = true }: AvatarProps) {
  /** icon的长宽 */
  const width = size;
  const height = size;

  /** 挂件的大小 */
  const accessorySize = ((Math.sqrt(2) - 1) * width) / Math.sqrt(2);

  /** 头像的弧度 */
  const avatarRadius = circular ? width / 2 : borderRadius;

  return {
    width,
    height,
    accessorySize,
    avatarRadius,
  };
}
