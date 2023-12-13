import { createContext } from 'react';

export const FormContext = createContext<{ formItemHeight: number; bordered?: boolean }>({ formItemHeight: 0 });
