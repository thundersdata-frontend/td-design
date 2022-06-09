declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.webp';
declare module '*.svg';

declare const AMAP_DRILL_SERVER_KEY: string;
declare const AMAP_DRILL_JS_KEY: string;
declare const AMAP_DRILL_JS_SECRET: string;

declare interface Window {
  echarts: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}
