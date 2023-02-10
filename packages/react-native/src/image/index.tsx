import { useTheme } from '@shopify/restyle';
import { useBoolean } from '@td-design/rn-hooks';
import React, { FC } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

import Modal from '../modal';
import { Theme } from '../theme';

export type ImageProps = FastImageProps & {
  /** 是否开启点击图片预览大图功能 */
  preview?: boolean;
};

const Image: FC<ImageProps> = ({ style, resizeMode = 'contain', source, preview = false, ...props }) => {
  const theme = useTheme<Theme>();

  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const Content = (
    <FastImage
      {...props}
      source={source}
      style={[{ borderRadius: theme.borderRadii.x1 }, style]}
      resizeMode={resizeMode}
    />
  );

  if (!preview) return Content;

  return (
    <>
      <TouchableWithoutFeedback onPress={setTrue}>{Content}</TouchableWithoutFeedback>
      <Modal visible={visible} onClose={setFalse} position="fullscreen">
        <TouchableWithoutFeedback onPress={setFalse}>
          <FastImage source={source} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
Image.displayName = 'Image';

export default Image;
