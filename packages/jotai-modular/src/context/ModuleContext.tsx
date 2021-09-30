import type { Atom, Scope } from 'jotai/core/atom';
import type { ReactNode } from 'react';

import React, { createContext } from 'react';
import { Provider as JotaiProvider } from 'jotai';

export const ModuleContext = createContext<Scope | undefined>(undefined);

export const ModuleProvider = ({
  initialValues,
  scope,
  children,
}: {
  initialValues: Iterable<readonly [Atom<unknown>, unknown]>;
  scope: Scope;
  children: ReactNode;
}) => (
  <ModuleContext.Provider value={scope}>
    <JotaiProvider initialValues={initialValues} scope={scope}>
      {children}
    </JotaiProvider>
  </ModuleContext.Provider>
);
