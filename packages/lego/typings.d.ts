declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.webp';
declare module '*.svg';

declare interface Window {
  echarts: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}

interface BarSeriesData {
  name: string;
  data: (string | number | { name: string; value: string | number })[];
  unit?: string;
}
