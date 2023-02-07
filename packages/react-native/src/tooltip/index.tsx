import { useMemoizedFn, useWhyDidYouUpdate } from '@td-design/rn-hooks';
import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import Backdrop from './Backdrop';
import Popover from './Popover';
import { TooltipProps } from './type';

export interface TooltipRef {
  show: () => void;
  hide: () => void;
}

const DEFAULT_LAYOUT = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

const Tooltip = forwardRef<TooltipRef, PropsWithChildren<TooltipProps>>(
  (
    {
      content,
      backgroundColor,
      style,
      children,
      onVisibleChange,
      position = 'top',
      caret = true,
      caretPosition = 'center',
    },
    ref
  ) => {
    const dimensions = useWindowDimensions();
    const popoverRef = useRef<View>(null);
    const childrenRef = useRef<TouchableOpacity>(null);

    const [popoverVisible, setPopoverVisible] = useState(false);
    const [childrenLayout, setChildrenLayout] = useState(DEFAULT_LAYOUT);
    const [popoverLayout, setPopoverLayout] = useState(DEFAULT_LAYOUT);

    const [computedPosition, setComputedPosition] = useState(position);
    const [popoverOffset, setPopoverOffset] = useState({ left: 0, top: 0 });
    const [popoverPagePosition, setPopoverPagePosition] = useState({
      left: 0,
      top: 0,
    });

    /** 暴露给外面通过ref操作tooltip的方法 */
    useImperativeHandle(ref, () => ({
      show: () => setPopoverVisible(true),
      hide: () => setPopoverVisible(false),
    }));

    useEffect(() => {
      let nextPosition = position;

      switch (position) {
        case 'left':
          if (popoverLayout.x <= 0) {
            nextPosition = 'right';
          }
          break;

        case 'right':
          if (popoverLayout.x + popoverLayout.width > dimensions.width) {
            nextPosition = 'left';
          }
          break;

        case 'top':
          if (popoverLayout.y <= 0) {
            nextPosition = 'bottom';
          }
          break;

        case 'bottom':
          if (popoverLayout.y + popoverLayout.height >= dimensions.height) {
            nextPosition = 'top';
          }
          break;
      }

      setComputedPosition(nextPosition);
    }, [position, popoverLayout, childrenLayout]);

    useWhyDidYouUpdate('tooltip', { position, popoverLayout, childrenLayout });

    useEffect(() => {
      let left = 0;
      let top = 0;

      switch (computedPosition) {
        case 'right':
        case 'left':
          top = (popoverLayout.height - childrenLayout.height) / 2;
          break;

        case 'top':
        case 'bottom':
          left = (popoverLayout.width - childrenLayout.width) / 2;
          break;
      }

      setPopoverOffset({ left, top });
    }, [computedPosition, popoverLayout, childrenLayout]);

    const handlePopoverLayout = useCallback(() => {
      popoverRef.current?.measureInWindow((x, y, width, height) => {
        setPopoverLayout({ x, y, width, height });
      });
    }, []);

    /** 拿到子组件的位置信息 */
    const handleChildrenLayout = useCallback(() => {
      childrenRef.current?.measureInWindow((x, y, width, height) => {
        setChildrenLayout({ x, y, width, height });
      });
    }, []);

    /** 点击子组件，显示tooltip */
    const handlePress = () => {
      popoverRef.current?.measure((_x, _y, _width, _height, pageX, pageY) => {
        setPopoverPagePosition({ left: pageX, top: pageY });
      });

      onVisibleChange?.(true);
      setPopoverVisible(true);
    };

    const handleHidePopover = useMemoizedFn(() => {
      setPopoverVisible(false);
      onVisibleChange?.(false);
    });

    const sharedPopoverProps = {
      backgroundColor,
      caret,
      caretPosition,
      children: content,
      position: computedPosition,
    };

    return (
      <View style={[styles.container]}>
        <Backdrop visible={popoverVisible} onPress={handleHidePopover}>
          {
            // Backdrop renders the same popover because:
            // since the backdrop adds a layer on top of the screen to
            // detect any "outside popover press", the inner popover becomes
            // unreachable: the upper layer would keep all the touch events.
            // Because the backdrop uses a modal as a layer, we render that
            // same popover inside the modal, and hide the initial one
            // underneath (which explains why the popover below this one has
            // `visible` set to `false`)
            <Popover
              {...sharedPopoverProps}
              visible={popoverVisible}
              style={[
                {
                  position: 'absolute',
                  transform: [{ translateX: popoverPagePosition.left }, { translateY: popoverPagePosition.top }],
                },
                style,
              ]}
            />
          }
        </Backdrop>
        <Popover
          ref={popoverRef}
          {...sharedPopoverProps}
          onLayout={handlePopoverLayout}
          visible={false}
          style={[
            computedPosition === 'top' && styles.popoverTop,
            computedPosition === 'bottom' && styles.popoverBottom,
            computedPosition === 'left' && {
              alignItems: 'flex-end',
              right: childrenLayout.width,
            },
            computedPosition === 'right' && { left: childrenLayout.width },
            {
              position: 'absolute',
              transform: [{ translateX: popoverOffset.left * -1 }, { translateY: popoverOffset.top * -1 }],
            },
            style,
          ]}
        />
        <TouchableOpacity ref={childrenRef} onLayout={handleChildrenLayout} onPress={handlePress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }
);
Tooltip.displayName = 'Tooltip';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  popoverTop: {
    bottom: '100%',
  },
  popoverBottom: {
    top: '100%',
  },
});

export default Tooltip;
