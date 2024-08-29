import { useEffect } from 'react';
import { BackHandler, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn, usePrevious, useSafeState } from '@td-design/rn-hooks';

import { Theme } from '../../theme';
import { ModalProps } from '../type';

const screen = Dimensions.get('screen');

const getPosition = (visible: boolean) => {
  return visible ? 0 : screen.height;
};

const getScale = (visible: boolean) => {
  'worklet';
  return visible ? 1 : 1.05;
};

const getOpacity = (visible: boolean) => {
  'worklet';
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
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // 通过modalVisible来控制modal的显示和隐藏，之所以要用modalVisible，是想要让modal的显隐有动画效果
  const [modalVisible, setModalVisible] = useSafeState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    }
  }, [visible]);

  const onBackAndroid = useMemoizedFn(() => {
    if (typeof onRequestClose === 'function') {
      return onRequestClose();
    }
    onClose?.();

    return visible ? true : false; // 返回true表示拦截了返回键
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackAndroid);

    return () => backHandler.remove();
  }, [onBackAndroid]);

  const animateCallback = useMemoizedFn((visible: boolean) => {
    setModalVisible(visible);
    onAnimationEnd?.(visible);
  });

  useEffect(() => {
    if (prevVisible !== visible) {
      if (animationType === 'slide') {
        translateY.value = withTiming(
          getPosition(visible),
          {
            duration: animationDuration,
          },
          () => {
            runOnJS(animateCallback)(visible);
          }
        );
      } else if (animationType === 'fade') {
        opacity.value = withTiming(getOpacity(visible), {
          duration: animationDuration,
        });
        scale.value = withSpring(getScale(visible), {}, () => {
          runOnJS(animateCallback)(visible);
        });
      }
    }
  }, [visible, animationType, position, animationDuration]);

  const handleMaskClose = () => {
    if (maskClosable) {
      onClose?.();
    }
  };

  const slideStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const fadeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const animationStyleMap = {
    slide: slideStyle,
    fade: fadeStyle,
  };

  const defaultStyle: StyleProp<ViewStyle> = {
    flexDirection: position === 'bottom' ? 'column-reverse' : 'column',
  };
  const wrapStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.x3,
  };
  switch (position) {
    case 'top':
      wrapStyle.paddingTop = insets.top;
      break;
    case 'bottom':
      wrapStyle.paddingBottom = insets.bottom;
      break;
    case 'center':
      defaultStyle.justifyContent = 'center';
      break;
    case 'fullscreen':
      wrapStyle.flex = 1;
      wrapStyle.paddingTop = insets.top;
      wrapStyle.paddingBottom = insets.bottom;
      break;
  }

  return {
    modalVisible,
    wrapStyle,
    defaultStyle,
    handleMaskClose,
    animationStyleMap,
  };
}
