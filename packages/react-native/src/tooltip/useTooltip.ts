import { useRef } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useBoolean, useCreation, useLatest, useSafeState } from '@td-design/rn-hooks';

import helpers from '../helpers';
import type { TooltipProps } from '.';
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
}: Pick<TooltipProps, 'skipAndroidStatusBar' | 'onVisibleChange' | 'width' | 'height'>) {
  const [visible, { toggle }] = useBoolean(false);
  const [state, setState] = useSafeState<TooltipState>(initState);
  const measureRef = useRef<View>(null);

  const onVisibleChangeRef = useLatest(onVisibleChange);

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

  const xy = useCreation(() => {
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
