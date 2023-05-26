import { ReactNode } from 'react';

export interface NotifyProps {
  content: ReactNode;
  duration?: number;
  autoClose?: boolean;
  activeOpacity?: number;
  onClose?: () => void;
  onPress?: () => void;
}
