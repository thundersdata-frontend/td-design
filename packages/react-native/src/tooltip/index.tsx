import React, { FC, PropsWithChildren, ReactNode, Reducer, useReducer, useRef } from 'react';
import { Dimensions, LayoutChangeEvent, Modal, Pressable, StyleProp, View, ViewStyle } from 'react-native';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import getTooltipCoordinate from './getTooltipCoordinate';
import Triangle from './Triangle';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
const { px } = helpers;

export interface TooltipProps {
  withCaret?: boolean;
  content: ReactNode;
  height?: number;
  width?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  withOverlay?: boolean;
  overlayColor?: string;
  backgroundColor?: string;
  actionType?: 'onPress' | 'onLongPress';
}

type State = {
  visible: boolean;
  elementWidth: number;
  elementHeight: number;
  offsetX: number;
  offsetY: number;
};

type Action =
  | {
      type: 'toggle';
    }
  | {
      type: 'computePosition';
      payload: Omit<State, 'visible'>;
    };

const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'toggle':
      return { ...prevState, visible: !prevState.visible };
    case 'computePosition':
      return { ...prevState, ...action.payload };
  }
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = props => {
  const {
    content,
    withOverlay = true,
    withCaret = true,
    actionType = 'onPress',
    height = px(40),
    width = px(150),
    backgroundColor = '#617080',
    overlayColor = 'rgba(250, 250, 250, 0.70)',
    children,
    containerStyle,
    onClose,
  } = props;

  const [{ visible, elementWidth, elementHeight, offsetX, offsetY }, dispatch] = useReducer(reducer, {
    visible: false,
    elementWidth: 0,
    elementHeight: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const boxRef = useRef<View>(null);

  const handleLayout = (e: LayoutChangeEvent) => {
    dispatch({
      type: 'computePosition',
      payload: {
        elementWidth: e.nativeEvent.layout.width,
        elementHeight: e.nativeEvent.layout.height,
        offsetX: e.nativeEvent.layout.x,
        offsetY: e.nativeEvent.layout.y,
      },
    });
  };

  const toggleTooltip = () => {
    if (boxRef.current) {
      boxRef.current.measureInWindow((pageOffsetX, pageOffsetY, width, height) => {
        dispatch({
          type: 'computePosition',
          payload: {
            offsetX: pageOffsetX,
            offsetY: pageOffsetY,
            elementWidth: width,
            elementHeight: height,
          },
        });
      });
    }

    if (visible) {
      onClose?.();
    }

    dispatch({ type: 'toggle' });
  };

  const getTooltipStyle = () => {
    const { x, y } = getTooltipCoordinate(
      offsetX,
      offsetY,
      elementWidth,
      elementHeight,
      ScreenWidth,
      ScreenHeight,
      width,
      withCaret
    );

    const tooltipStyle: StyleProp<ViewStyle> = {
      position: 'absolute',
      left: x,
      width,
      height,
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: px(4),
    };

    const pastCenterLine = offsetX > x;
    const pastMiddleLine = offsetY > y;

    if (pastMiddleLine) {
      tooltipStyle.top = y - height;
    } else {
      tooltipStyle.top = y;
    }

    return { tooltipStyle, pastMiddleLine, pastCenterLine };
  };

  const renderPointer = (pastMiddleLine: boolean, pastCenterLine: boolean) => {
    return (
      <Box
        style={{
          position: 'absolute',
          top: pastMiddleLine ? offsetY - 13 : offsetY + elementHeight,
          left: pastCenterLine ? offsetX + elementWidth / 2 - 20 : offsetX + elementWidth / 2,
        }}
      >
        <Triangle
          style={{
            borderBottomColor: backgroundColor,
          }}
          isDown={pastMiddleLine}
        />
      </Box>
    );
  };

  const renderContent = () => {
    const { pastMiddleLine, pastCenterLine, tooltipStyle } = getTooltipStyle();
    return (
      <>
        <Box
          style={{
            position: 'absolute',
            left: offsetX,
            top: offsetY,
            overflow: 'visible',
            width: elementWidth,
            height: elementHeight,
          }}
        >
          {children}
        </Box>
        {withCaret && renderPointer(pastMiddleLine, pastCenterLine)}
        <Box style={[tooltipStyle, containerStyle]}>
          {typeof content === 'string' ? (
            <Text variant={'p1'} color="text_active">
              {content}
            </Text>
          ) : (
            content
          )}
        </Box>
      </>
    );
  };

  const pressableProps = {
    [actionType]: toggleTooltip,
  };

  return (
    <>
      <Pressable {...pressableProps}>
        <Box alignSelf={'flex-start'} ref={boxRef} onLayout={handleLayout}>
          {children}
        </Box>
      </Pressable>
      <Modal animationType="fade" visible={visible} transparent onDismiss={onClose}>
        <Pressable
          style={{
            backgroundColor: withOverlay ? overlayColor : 'transparent',
            flex: 1,
          }}
          onPress={toggleTooltip}
        >
          {renderContent()}
        </Pressable>
      </Modal>
    </>
  );
};

export default Tooltip;
