import NiceModal, { useModal } from '@ebay/nice-modal-react';
import React, { FC } from 'react';

import Modal from '../../modal/Modal';
import { TreeProps } from '../type';
import Tree from './Tree';

const TreeModal: FC<TreeProps> = props => {
  const modal = useModal();

  return (
    <Modal visible={modal.visible} maskClosable={true} position="bottom" onClose={modal.hide}>
      <Tree {...props} />
    </Modal>
  );
};
TreeModal.displayName = 'TreeModal';

export default NiceModal.create(TreeModal);
