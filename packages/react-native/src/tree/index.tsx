import React from 'react';

import Portal from '../portal';
import Tree from './components/Tree';
import TreeModal from './components/TreeModal';
import { TreeProps } from './type';

function modal(props: TreeProps) {
  return Portal.add(<TreeModal {...props} />);
}

export default Object.assign(Tree, { modal });
