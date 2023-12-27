import { ReactElement } from 'react';

import type { FieldProps } from 'rc-field-form/lib/Field';

import { ListItemProps } from '../list-item';

type RcFieldProps = Omit<FieldProps, 'children'>;
export interface FormItemProps extends RcFieldProps {
  type?: 'bottom' | 'all';
  noStyle?: boolean;
  children: ReactElement;
}

export interface FormListItemProps
  extends RcFieldProps,
    Pick<ListItemProps, 'title' | 'required' | 'style' | 'thumb' | 'onPress' | 'arrow' | 'backgroundColor'> {
  children: ReactElement;
  noStyle?: boolean;
}
