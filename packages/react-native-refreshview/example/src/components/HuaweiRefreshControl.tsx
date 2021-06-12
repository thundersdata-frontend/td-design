import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Animated, Text, Easing} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {
  AnyHeader,
  SmartRefreshControl,
} from '@td-design/react-native-refreshview';
import {
  SmartRefreshLayoutProps,
  FinishRefreshParams,
} from '@td-design/react-native-refreshview/lib/typescript/type';

import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const HuaweiRefreshControl = forwardRef<any, SmartRefreshLayoutProps>(
  (props, ref) => {
    const refreshControl = useRef<any>(null);
    const rotate = useRef(new Animated.Value(0));
    const [text, setText] = useState('下拉刷新');
    const [refreshing, setRefreshing] = useState(false);

    const onPullDownToRefresh = () => {
      setText('下拉刷新');
      setRefreshing(false);
      Animated.timing(rotate.current, {
        toValue: 0,
        duration: 197,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };
    const onReleased = () => {
      setText('正在刷新');
      setRefreshing(true);
    };
    const onReleaseToRefresh = () => {
      setText('释放刷新');
      Animated.timing(rotate.current, {
        toValue: 1,
        duration: 197,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    const onRefresh = () => {
      props.onRefresh?.();
    };

    const finishRefresh = (params: FinishRefreshParams) => {
      refreshControl.current?.finishRefresh(params);
    };

    useImperativeHandle(ref, () => {
      return {
        finishRefresh,
      };
    });

    return (
      <SmartRefreshControl
        primaryColor="#ffcc03"
        style={{flex: 1}}
        ref={refreshControl}
        onRefresh={onRefresh}
        onPullDownToRefresh={onPullDownToRefresh}
        onHeaderReleased={onReleased}
        onReleaseToRefresh={onReleaseToRefresh}
        onHeaderMoving={e => {
          console.log(e.nativeEvent.percent);
        }}
        headerHeight={150}
        HeaderComponent={
          <AnyHeader
            style={{
              height: 150,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {refreshing ? (
              <SkypeIndicator style={{flex: 0}} size={24} color={'#2783cf'} />
            ) : (
              <AnimatedIcon
                style={{
                  transform: [
                    {
                      rotate: rotate.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg'],
                      }),
                    },
                  ],
                }}
                name="md-arrow-up"
                color="#2783cf"
                size={24}
              />
            )}
            <Text style={{marginLeft: 15}}>{text}</Text>
          </AnyHeader>
        }>
        {props.children}
      </SmartRefreshControl>
    );
  },
);
