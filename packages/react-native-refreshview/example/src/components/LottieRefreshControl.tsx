import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Animated} from 'react-native';
import {
  AnyHeader,
  SmartRefreshControl,
} from '@td-design/react-native-refreshview';
import {
  SmartRefreshLayoutProps,
  FinishRefreshParams,
} from '@td-design/react-native-refreshview/lib/typescript/type';
import LottieView from 'lottie-react-native';

export const LottieRefreshControl = forwardRef<any, SmartRefreshLayoutProps>(
  (props, ref) => {
    const scale = useRef(new Animated.Value(0.1));
    const refreshControl = useRef<any>(null);
    const lottie = useRef<LottieView>(null);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const listener = scale.current.addListener(({value}) => {
        lottie.current?.play(value);
      });

      return () => scale.current.removeListener(listener);
    }, []);

    const onHeaderMoving = (event: any) => {
      const {percent} = event.nativeEvent;
      if (percent < 1) {
        setProgress(percent);
        scale.current.setValue(percent);
      }
    };

    const onRefresh = () => {
      props.onRefresh?.();
    };

    const finishRefresh = (params: FinishRefreshParams) => {
      refreshControl.current?.finishRefresh(params);
      lottie.current?.reset();
    };

    useImperativeHandle(ref, () => {
      return {
        finishRefresh,
      };
    });

    return (
      <SmartRefreshControl
        onHeaderMoving={onHeaderMoving}
        style={{flex: 1}}
        ref={refreshControl}
        onRefresh={onRefresh}
        headerHeight={100}
        HeaderComponent={
          <AnyHeader>
            <Animated.View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                  {
                    scale: scale.current?.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: [0.1, 1, 1],
                    }),
                  },
                ],
              }}>
              <LottieView
                speed={2}
                ref={lottie}
                style={{width: 100, height: 100}}
                hardwareAccelerationAndroid
                progress={progress}
                source={require('./cycle_animation.json')}
              />
            </Animated.View>
          </AnyHeader>
        }>
        {props.children}
      </SmartRefreshControl>
    );
  },
);
