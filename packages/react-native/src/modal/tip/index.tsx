import NiceModal from '@ebay/nice-modal-react';

import { TipProps } from '../type';
import TipContainer from './TipContainer';

export default function tip(props: TipProps) {
  NiceModal.show(TipContainer, props);
}
