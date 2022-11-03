import { animated, useSpring } from '@react-spring/web';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  /** 弹窗是否可见 */
  visible: boolean;
  /** 弹窗的宽度 */
  width?: number;
  /** 弹窗的高度 */
  height?: number;
  /** 弹窗出现的位置离左侧距离 */
  left?: number;
  /** 弹窗出现的位置离上侧距离 */
  top?: number;
  /** 弹窗关闭 */
  onClose: () => void;
  /** 弹窗的背景图 */
  backgroundImage?: string;
  children: ReactNode;
}

const Modal = ({
  visible,
  onClose,
  children,
  width = 784,
  backgroundImage = `url(${require('./assets/modal_bg.png')})`,
  height = 800,
  left,
  top,
}: ModalProps) => {
  const [animatedStyles, api] = useSpring(() => ({}));
  const isFirstLoad = useRef(true);
  const [animatedVisible, setAnimatedVisible] = useState(visible);

  const modalLeft = left ?? (window.innerWidth - width) / 2;
  const modalTop = top ?? (window.innerHeight - height) / 2;

  useEffect(() => {
    if (visible) {
      isFirstLoad.current = false;
      setAnimatedVisible(true);
      api.start({
        opacity: 1,
        width,
        height,
        left: modalLeft,
        top: modalTop,
      });
    } else {
      api
        .start({
          opacity: 0,
          width: 0,
          height: 0,
        })?.[0]
        .then(() => {
          setAnimatedVisible(false);
          if (!isFirstLoad.current) {
            onClose();
          }
        });
    }
  }, [visible]);

  const modal = createPortal(
    <>
      <animated.div
        style={{
          position: 'absolute',
          zIndex: 999999,
          overflow: 'hidden',
          backgroundSize: '100% 100%',
          backgroundImage,
          ...animatedStyles,
        }}
      >
        <div style={{ width, height }}>{children}</div>
      </animated.div>
      {/* 蒙层点击可关闭 */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(7, 3, 28, 0.3)',
          zIndex: 99,
        }}
        onClick={onClose}
      />
    </>,
    document.body
  );
  return <>{animatedVisible && modal}</>;
};

export default Modal;
