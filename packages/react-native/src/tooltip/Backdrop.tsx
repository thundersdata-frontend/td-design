import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Modal, ModalProps, Pressable } from 'react-native';

import { ANIMATION_DURATION } from './constant';

// On iOS, Modal orientations need to be manually specified
const IOS_MODAL_SUPPORTED_ORIENTATIONS: ModalProps['supportedOrientations'] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

export default function Backdrop({
  children,
  onPress,
  visible,
}: PropsWithChildren<{ visible: boolean; onPress: () => void }>) {
  const [delayedVisible, setDelayedVisible] = useState(visible);

  useEffect(() => {
    // When `Modal.visible` changes, the inner view gets hidden
    // immediately. This gives no time to `Popover` to animate
    // when `visible` becomes `false`. By delaying the `visible`
    // property, it gives extra time for the popover to animate,
    // then hide the modal
    if (visible) {
      setDelayedVisible(true);
    } else {
      setTimeout(() => setDelayedVisible(false), ANIMATION_DURATION);
    }
  }, [visible]);

  return (
    <Modal
      visible={delayedVisible}
      onRequestClose={onPress}
      hardwareAccelerated
      transparent
      supportedOrientations={IOS_MODAL_SUPPORTED_ORIENTATIONS}
    >
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        {children}
      </Pressable>
    </Modal>
  );
}
