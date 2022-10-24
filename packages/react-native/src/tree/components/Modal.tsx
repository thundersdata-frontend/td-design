import { useBoolean } from '@td-design/rn-hooks';
import React, { FC } from 'react';

import Modal from '../../modal/Modal';
import { TreeProps } from '../type';
import Tree from './Tree';

const TreeModal: FC<TreeProps> = props => {
  const [visible, { setFalse }] = useBoolean(true);

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
      <Tree {...props} />
    </Modal>
  );
};

export default TreeModal;
