import React, { memo } from 'react';
import { SvgXml } from 'react-native-svg';

const PlusIcon = () => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
      <path fill="#fff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/>
    </svg>
  `;

  return <SvgXml xml={xml} />;
};

export default memo(PlusIcon);
