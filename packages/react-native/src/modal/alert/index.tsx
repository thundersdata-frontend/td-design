import NiceModal from '@ebay/nice-modal-react';

import { AlertProps } from '../type';
import AlertContainer from './AlertContainer';

export default function alert(props: AlertProps) {
  NiceModal.show(AlertContainer, props);
}
