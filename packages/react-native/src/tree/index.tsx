import React from 'react';

import Portal from '../portal';
import Tree from './components/Tree';
import TreeModal from './components/Modal';
import { TreeProps } from './type';

function modal(props: TreeProps) {
  const key = Portal.add(<TreeModal {...props} />);

  return key;
}

export default Object.assign(Tree, {
  modal,
});
