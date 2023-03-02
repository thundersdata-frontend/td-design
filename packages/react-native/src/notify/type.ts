import { ReactNode } from 'react';

export interface NotifyProps {
  content: ReactNode;
  duration?: number;
  autoClose?: boolean;
  onClose?: () => void;
  onPress?: () => void;
}
