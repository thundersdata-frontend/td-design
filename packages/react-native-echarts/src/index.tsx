import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Platform, View, Dimensions } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

import { buildEcharts, formatString, EchartsInitOptions } from './utils/builder';

const { width: deviceWidth } = Dimensions.get('window');

interface EchartsProps {
  /** 图表的宽度 */
  width?: number;
  /** 图表的高度 */
  height?: number;
  /** 图表的背景色 */
  backgroundColor?: string;
  /** 额外注入的代码，比如注册地图 */
  extraCode?: string;
  /** echarts初始化配置 */
  echartsInitOptions?: EchartsInitOptions;
}

export interface EchartsHandler {
  setBackgroundColor: (color: string) => void;
  getOption: (callback: (data: any) => void, properties?: string[]) => void;
  setOption: (options: any) => void;
  clear: () => void;
}

const Echarts = forwardRef<EchartsHandler, EchartsProps>(
  (
    {
      width = deviceWidth,
      height = 300,
      backgroundColor = '#fff',
      extraCode,
      echartsInitOptions = { renderer: 'svg', locale: 'ZH', useDirtyRect: true },
    },
    forwardedRef
  ) => {
    const webviewRef = useRef<WebView>(null);
    const callbacks = useRef({});

    const postMessage = (data: Record<string, any>) => {
      webviewRef.current?.postMessage(formatString(JSON.stringify(data)));
    };

    const getID = () => `_${Math.random().toString(36).substr(2, 9)}`;

    const setBackgroundColor = (color: string) => {
      const data = {
        types: 'SET_BACKGROUND_COLOR',
        color,
      };
      postMessage(data);
    };

    const getOption = (callback: (data: any) => void, properties?: string[]) => {
      const uuid = getID();
      callbacks.current[uuid] = callback;
      const data = {
        types: 'GET_OPTION',
        uuid,
        properties,
      };
      postMessage(data);
    };

    const setOption = (option: any, notMerge = false, lazyUpdate = false) => {
      const data = {
        types: 'SET_OPTION',
        payload: {
          option,
          notMerge,
          lazyUpdate,
        },
      };
      postMessage(data);
    };

    const clear = () => {
      const data = {
        types: 'CLEAR',
      };
      postMessage(data);
    };

    useImperativeHandle(forwardedRef, () => ({
      setBackgroundColor,
      getOption,
      setOption,
      clear,
    }));

    const handleMessage = (e: WebViewMessageEvent) => {
      try {
        const data = JSON.parse(unescape(unescape(e.nativeEvent.data)));
        if (data.type === 'CALLBACK') {
          const { uuid } = data;
          callbacks.current[uuid](data.payload);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleLoadEnd = () => {
      if (extraCode) {
        webviewRef.current?.injectJavaScript(`
          ${extraCode};
          true;
        `);
      }
      webviewRef.current?.injectJavaScript(buildEcharts(backgroundColor, echartsInitOptions));
    };

    return (
      <View style={{ width, height, overflow: 'hidden' }}>
        <WebView
          ref={webviewRef}
          source={Platform.OS === 'ios' ? require('./tmp/tpl.html') : { uri: 'file:///android_asset/tpl.html' }}
          // https://github.com/react-native-webview/react-native-webview/issues/430
          style={{ flex: 1, opacity: 0.99, backgroundColor: '#fff' }}
          scrollEnabled={false}
          javaScriptEnabled
          mixedContentMode="always"
          originWhitelist={['*']}
          // https://github.com/react-native-webview/react-native-webview/issues/1069
          androidHardwareAccelerationDisabled={false}
          androidLayerType="hardware"
          onLoadEnd={handleLoadEnd}
          onMessage={handleMessage}
        />
      </View>
    );
  }
);

export default Echarts;
