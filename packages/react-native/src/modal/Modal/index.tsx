import React, { FC, useEffect, useCallback, useState, useMemo } from 'react';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Animated,
  Easing,
  BackHandler,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme';
import Box from '../../box';
import Portal from '../../portal';
import { useRef } from 'react';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
export interface ModalProps {
  /** 是否显示弹窗 */
  visible: boolean;
  /** 关闭弹窗事件 */
  onClose: () => void;
  /** 蒙层是否允许点击关闭弹窗 */
  maskClosable?: boolean;
  /** 是否显示蒙层背景 */
  maskVisible?: boolean;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'bottom' | 'center' | 'fullscreen';
  bodyContainerStyle?: StyleProp<ViewStyle>;
}

const Modal: FC<ModalProps> = ({
  visible,
  onClose,
  children,
  maskClosable = true,
  maskVisible = true,
  position = 'bottom',
  bodyContainerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();

  const opacity = useRef(new Animated.Value(0));
  const [rendered, setRendered] = useState(false);

  /**
   * 打开弹窗
   */
  const showModal = useCallback(() => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity]);

  /**
   * 关闭弹窗
   */
  const hideModal = useCallback(() => {
    Animated.timing(opacity.current, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(finished => {
      if (!finished) return;

      if (visible) {
        onClose?.();
        showModal();
      } else {
        setRendered(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity, visible]);

  useEffect(() => {
    if (visible && !rendered) {
      setRendered(true);
    }
    if (visible) {
      showModal();
    } else if (rendered) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, rendered]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        hideModal();
        return true;
      }
      return false;
    });

    return () => handler.remove();
  }, [visible, hideModal]);

  const wrapContainer = {};
  const edges = useMemo(() => {
    let edges: Edge[] = [];
    switch (position) {
      case 'bottom':
        Object.assign(wrapContainer, { paddingBottom: insets.bottom });
        edges = ['top'];
        break;
      case 'center':
        Object.assign(wrapContainer);
        edges = ['top', 'bottom'];
        break;
      case 'fullscreen':
        Object.assign(wrapContainer, { flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom });
        edges = ['left', 'right'];
        break;
      default:
        break;
    }
    return edges;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  if (!rendered) return null;
  return (
    <Portal>
      <AnimatedSafeAreaView
        style={[
          {
            zIndex: 99,
            flex: 1,
            backgroundColor: maskVisible ? theme.colors.mask : theme.colors.transparent,
            flexDirection: position === 'bottom' ? 'column-reverse' : 'column',
          },
          position === 'center'
            ? {
                justifyContent: 'center',
              }
            : {},
          {
            opacity: opacity.current,
          },
        ]}
        edges={edges}
      >
        <Box backgroundColor="background" zIndex="99" style={[wrapContainer, bodyContainerStyle]}>
          {children}
        </Box>
        {position !== 'fullscreen' && (
          <TouchableWithoutFeedback
            disabled={!maskClosable}
            onPress={maskClosable ? hideModal : undefined}
            style={{ zIndex: 19 }}
          >
            <Animated.View style={[StyleSheet.absoluteFill]} />
          </TouchableWithoutFeedback>
        )}
      </AnimatedSafeAreaView>
    </Portal>
  );
};

export default Modal;
