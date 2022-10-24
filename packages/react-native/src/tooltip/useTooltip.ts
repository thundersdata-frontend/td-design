import { useBoolean, useLatest, useSafeState } from '@td-design/rn-hooks';
import { ForwardedRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Platform, StatusBar, View } from 'react-native';

import helpers from '../helpers';
import type { TooltipProps, TooltipRef } from './';
import getTooltipCoordinate from './getTooltipCoordinate';

export type TooltipState = {
  yOffset: number;
  xOffset: number;
  elementWidth: number;
  elementHeight: number;
};

const initState = {
  yOffset: 0,
  xOffset: 0,
  elementWidth: 0,
  elementHeight: 0,
};
const { isIOS, deviceWidth, deviceHeight, px } = helpers;
export default function useTooltip({
  onVisibleChange,
  skipAndroidStatusBar,
  width = px(150),
  height = px(40),
  ref,
}: Pick<TooltipProps, 'skipAndroidStatusBar' | 'onVisibleChange' | 'width' | 'height'> & {
  ref?: ForwardedRef<TooltipRef>;
}) {
  const [visible, { toggle, set }] = useBoolean(false);
  const [state, setState] = useSafeState<TooltipState>(initState);
  const measureRef = useRef<View>(null);

  const onVisibleChangeRef = useLatest(onVisibleChange);

  useImperativeHandle(ref, () => {
    return { show, close };
  });

  const show = () => {
    getElementPosition();
    set(true);
    onVisibleChangeRef.current?.(true);
  };

  const close = () => {
    getElementPosition();
    set(false);
    onVisibleChangeRef.current?.(false);
  };

  const toggleTooltip = () => {
    getElementPosition();
    toggle();
    onVisibleChangeRef.current?.(!visible);
  };

  const getElementPosition = () => {
    if (measureRef.current) {
      measureRef.current.measure((_frameOffsetX, _frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        const value: TooltipState = {
          xOffset: pageOffsetX,
          yOffset:
            isIOS ?? skipAndroidStatusBar
              ? pageOffsetY
              : pageOffsetY -
                Platform.select({
                  android: StatusBar.currentHeight,
                  ios: 20,
                  default: 0,
                }),
          elementWidth: width,
          elementHeight: height,
        };
        setState(value);
      });
    }
  };

  const xy = useMemo(() => {
    const { yOffset, xOffset, elementHeight, elementWidth } = state;
    return getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      deviceWidth,
      deviceHeight,
      width,
      height
    );
  }, [height, state, width]);

  return { state, xy, toggleTooltip, visible, measureRef };
}
