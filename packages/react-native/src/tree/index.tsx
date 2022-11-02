import React from 'react';

import Portal from '../portal';
import TreeModal from './components/Modal';
import Tree from './components/Tree';
import { TreeProps } from './type';

function modal(props: TreeProps) {
  const key = Portal.add(<TreeModal {...props} />);

  return key;
}

export default Object.assign(Tree, {
  modal,
});
