import React, { useState, FC } from 'react';

import Modal from '../../modal/Modal';
import Tree from './Tree';
import { ScrollView } from 'react-native';
import helpers from '../../helpers';
import { TreeProps } from '../type';

const { deviceHeight } = helpers;

const TreeModal: FC<TreeProps> = props => {
  const [visible, setVisible] = useState(true);

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={() => setVisible(false)}>
      <ScrollView style={{ height: deviceHeight / 3 }}>
        <Tree {...props} />
      </ScrollView>
    </Modal>
  );
};

export default TreeModal;
