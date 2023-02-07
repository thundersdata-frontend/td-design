export interface ToastProps {
  content: string;
  position: 'top' | 'middle' | 'bottom';
  duration: number;
  mask?: boolean;
  indicator?: boolean;
}
