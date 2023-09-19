import React from 'react';
import { SvgXml } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';

import { Theme } from '../theme';

export default function Checkbox({ disabled, checked }: { disabled?: boolean; checked: 'all' | 'half' | 'none' }) {
  const theme = useTheme<Theme>();

  if (checked === 'all') {
    return (
      <SvgXml
        color={disabled ? theme.colors.disabled : theme.colors.primary200}
        xml={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7.003 13l7.07-7.071l-1.413-1.414l-5.657 5.657l-2.829-2.829l-1.414 1.414L11.003 16Z"/></svg>`}
      />
    );
  } else if (checked === 'half') {
    return (
      <SvgXml
        color={disabled ? theme.colors.disabled : theme.colors.primary200}
        xml={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 8v2h10v-2H7Z"/></svg>`}
      />
    );
  }
  return (
    <SvgXml
      color={disabled ? theme.colors.disabled : theme.colors.gray500}
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v14h14V5H5Z"/></svg>`}
    />
  );
}
