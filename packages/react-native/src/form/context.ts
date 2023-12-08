import { createContext } from 'react';

export const FormContext = createContext<{ formItemHeight: number }>({ formItemHeight: 0 });
