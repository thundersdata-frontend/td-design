export interface ProgressProps {
  width?: number;
  color?: string | [string, string];
  bgColor?: string;
  strokeWidth?: number;
  value?: number;
  showLabel?: boolean;
  labelPosition?: 'right' | 'top';
  showUnit?: boolean;
}
