import React, { useState, FC } from 'react';

import Modal from '../modal/Modal';
import Tree, { TreeProps } from './Tree';
import { ScrollView } from 'react-native';
import helpers from '../helpers';

const { deviceHeight } = helpers;
export interface TreeModalProps extends TreeProps {
  afterClose: () => void;
}

const TreeModal: FC<TreeModalProps> = ({ afterClose, ...props }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      maskClosable={true}
      position="bottom"
      onClose={() => setVisible(false)}
      afterClose={afterClose}
    >
      <ScrollView style={{ height: deviceHeight / 3 }}>
        <Tree {...props} />
      </ScrollView>
    </Modal>
  );
};

export default TreeModal;
