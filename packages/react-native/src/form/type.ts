import type { FieldProps } from 'rc-field-form/lib/Field';
import { ReactElement } from 'react';
import { ListItemProps } from '../list-item';

type RcFieldProps = Omit<FieldProps, 'children'>;
export interface FormItemProps extends RcFieldProps {
  type?: 'bottom' | 'all';
  children: ReactElement;
}

export interface FormListItemProps
  extends RcFieldProps,
    Pick<ListItemProps, 'title' | 'required' | 'style' | 'thumb' | 'onPress' | 'minHeight' | 'arrow'> {
  children: ReactElement;
}
