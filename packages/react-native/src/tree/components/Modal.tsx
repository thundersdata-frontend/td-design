import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { useBoolean } from '@td-design/rn-hooks';

import Modal from '../../modal/Modal';
import Tree from './Tree';
import helpers from '../../helpers';
import { TreeProps } from '../type';

const { deviceHeight } = helpers;

const TreeModal: FC<TreeProps> = props => {
  const [visible, { setFalse }] = useBoolean(true);

  return (
    <Modal visible={visible} maskClosable={true} position="bottom" onClose={setFalse}>
      <ScrollView style={{ height: deviceHeight / 3 }}>
        <Tree {...props} />
      </ScrollView>
    </Modal>
  );
};

export default TreeModal;
