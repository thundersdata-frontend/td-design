import { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, Easing, StyleProp, ViewStyle } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@shopify/restyle';
import { usePrevious } from '@td-design/rn-hooks';

import { Theme } from '../../theme';
import { ModalProps } from '../type';

const screen = Dimensions.get('window');
const getPosition = (visible: boolean, animationType: string) => {
  if (visible) {
    return 0;
  }
  return animationType === 'slide-down' ? -screen.height : screen.height;
};

const getScale = (visible: boolean) => {
  return visible ? 1 : 1.05;
};

const getOpacity = (visible: boolean) => {
  return visible ? 1 : 0;
};

export default function useModal({
  animationType,
  animationDuration,
  visible,
  maskClosable,
  position,
  onClose,
  onAnimationEnd,
  onRequestClose,
}: ModalProps) {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const prevVisible = usePrevious(visible);

  const animMask = useRef<Animated.CompositeAnimation>();
  const animDialog = useRef<Animated.CompositeAnimation>();

  const translateY = useRef(new Animated.Value(getPosition(visible, animationType!))).current;
  const scale = useRef(new Animated.Value(getScale(visible))).current;
  const opacity = useRef(new Animated.Value(getOpacity(visible))).current;

  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    if (animationType !== 'none') {
      BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
      if (prevVisible !== visible) {
        animateDialog(visible);
      }
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
      stopAnimateDialog();
    };
  }, [animationType, visible]);

  const onBackAndroid = () => {
    if (typeof onRequestClose === 'function') {
      return onRequestClose();
    }
    onClose?.();
    return true;
  };

  const animateDialog = (visible: boolean) => {
    stopAnimateDialog();
    animateMask(visible);

    if (animationType !== 'none') {
      if (animationType === 'slide-up' || animationType === 'slide-down') {
        translateY.setValue(getPosition(!visible, animationType));

        animDialog.current = Animated.timing(translateY, {
          toValue: getPosition(visible, animationType),
          duration: animationDuration,
          easing: visible ? Easing.elastic(0.8) : undefined,
          useNativeDriver: true,
        });
      } else if (animationType === 'fade') {
        animDialog.current = Animated.parallel([
          Animated.timing(opacity, {
            toValue: getOpacity(visible),
            duration: animationDuration,
            easing: (visible ? Easing.elastic(0.8) : undefined) as any,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: getScale(visible),
            useNativeDriver: true,
          }),
        ]);
      }
      animDialog.current?.start(() => {
        animDialog.current = undefined;
        if (!visible) {
          setModalVisible(false);
          BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
        }
        onAnimationEnd?.(visible);
      });
    } else {
      if (!visible) {
        setModalVisible(false);
        BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
      }
    }
  };

  const stopAnimateDialog = () => {
    if (animDialog.current) {
      animDialog.current.stop();
      animDialog.current = undefined;
    }
  };

  const animateMask = (visible: boolean) => {
    stopAnimateMask();
    opacity.setValue(getOpacity(!visible));
    animMask.current = Animated.timing(opacity, {
      toValue: getOpacity(visible),
      duration: animationDuration,
      useNativeDriver: true,
    });
    animMask.current.start(() => {
      animMask.current = undefined;
    });
  };

  const stopAnimateMask = () => {
    if (animMask.current) {
      animMask.current.stop();
      animMask.current = undefined;
    }
  };

  const handleMaskClose = () => {
    if (maskClosable) {
      onClose?.();
      BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
    }
  };

  const animationStyleMap = {
    none: {},
    'slide-up': { transform: [{ translateY }] },
    'slide-down': { transform: [{ translateY }] },
    fade: {
      transform: [{ scale }],
      opacity: opacity,
    },
  };

  let edges: Edge[] = ['top'];
  const defaultStyle: StyleProp<ViewStyle> = {
    flexDirection: position === 'bottom' ? 'column-reverse' : 'column',
  };
  if (position === 'center') {
    defaultStyle.justifyContent = 'center';
  }

  const wrapStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.x3,
  };
  if (position === 'bottom') {
    wrapStyle.paddingBottom = insets.bottom;
  }
  if (position === 'fullscreen') {
    wrapStyle.flex = 1;
    wrapStyle.paddingTop = insets.top;
    wrapStyle.paddingBottom = insets.bottom;
    edges = [];
  }

  const maskStyle = { backgroundColor: theme.colors.mask };

  return {
    modalVisible,
    maskStyle,
    wrapStyle,
    defaultStyle,
    handleMaskClose,
    opacity,
    animationStyleMap,
    edges,
  };
}
