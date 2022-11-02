import React, { FC } from 'react';
import { useBoolean } from '@td-design/rn-hooks';

import Modal from '../../modal/Modal';
import Tree from './Tree';
import { TreeProps } from '../type';

const TreeModal: FC<TreeProps> = props => {
  const [visible, { setFalse }] = useBoolean(true);

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
      <Tree {...props} />
    </Modal>
  );
};

export default TreeModal;
