import React from 'react';

import Portal from '../portal';
import Tree, { TreeProps } from './Tree';
import TreeModal from './TreeModal';

function modal(props: TreeProps) {
  const key = Portal.add(<TreeModal {...props} afterClose={() => Portal.remove(key)} />);

  return key;
}

export default Object.assign(Tree, {
  modal,
});
