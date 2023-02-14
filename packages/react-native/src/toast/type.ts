import { ReactNode } from 'react';

export interface ToastProps {
  content: ReactNode;
  position: 'top' | 'middle' | 'bottom';
  duration: number;
  mask?: boolean;
  indicator?: boolean;
}
